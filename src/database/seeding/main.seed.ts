import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import * as dotenv from 'dotenv';

import AppDataSource from 'typeorm.config';
import { Students } from 'src/modules/students/entities/students.entity';
import { Scores } from 'src/modules/scores/entities/scores.entity';

import { StudentsSeeder } from './students.seeder';
import { ScoresSeeder } from './scores.seeder';

dotenv.config();

async function run() {
  await AppDataSource.initialize();
  const studentRepo = AppDataSource.getRepository(Students);
  const scoresRepo = AppDataSource.getRepository(Scores);

  const studentsSeeder = new StudentsSeeder(studentRepo);
  const scoresSeeder = new ScoresSeeder(scoresRepo);

  const csvPath = path.resolve(__dirname, '../../data/diem_thi_thpt_2024.csv');
  const BATCH_SIZE = 2500;

  const studentBuffer: Students[] = [];
  const scoresBuffer: Scores[] = [];
  let total = 0;

  return new Promise<void>((resolve, reject) => {
    const stream = fs.createReadStream(csvPath).pipe(csv());

    stream.on('data', async (data) => {
      stream.pause();

      const student = studentsSeeder.parse(data);
      const score = scoresSeeder.parse(data);

      studentBuffer.push(student);
      scoresBuffer.push(score);

      if (studentBuffer.length >= BATCH_SIZE) {
        const studentsChunk = [...studentBuffer];
        const scoresChunk = [...scoresBuffer];
        studentBuffer.length = 0;
        scoresBuffer.length = 0;

        try {
          await studentsSeeder.seedChunk(studentsChunk);
          await scoresSeeder.seedChunk(scoresChunk);
          total += studentsChunk.length;
          console.log(`Seeded ${total} records...`);
          stream.resume();
        } catch (error) {
          reject(error);
        }
      } else {
        stream.resume();
      }
    });

    stream.on('end', async () => {
      try {
        if (studentBuffer.length > 0) {
          await studentsSeeder.seedChunk(studentBuffer);
          await scoresSeeder.seedChunk(scoresBuffer);
          total += studentBuffer.length;
          console.log(`Final chunk seeded: ${studentBuffer.length} records`);
        }
        console.log(`All done. Total seeded: ${total}`);
        await AppDataSource.destroy();
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    stream.on('error', reject);
  });
}

run()
  .then(() => {
    console.log('Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
