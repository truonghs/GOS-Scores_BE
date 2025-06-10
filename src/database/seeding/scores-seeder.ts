import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Scores } from 'src/modules/scores/entities/scores.entity';
import { InsertScoresDTO } from 'src/modules/scores/dtos/insert-scores.dto';

@Injectable()
export class ScoresSeeder {
  constructor(private scoresRepo: Repository<Scores>) {}

  async seed(): Promise<void> {
    const csvPath = path.resolve(
      __dirname,
      '../../data/diem_thi_thpt_2024.csv',
    );
    const BATCH_SIZE = 5000;
    let buffer: InsertScoresDTO[] = [];
    let total = 0;

    return new Promise<void>((resolve, reject) => {
      const stream = fs.createReadStream(csvPath).pipe(csv());

      stream.on('data', (data) => {
        stream.pause();

        const score = Scores.fromCsv(data);
        buffer.push(score);

        if (buffer.length >= BATCH_SIZE) {
          const currentBatch = [...buffer];
          buffer = [];

          this.scoresRepo
            .createQueryBuilder()
            .insert()
            .into(Scores)
            .values(currentBatch)
            .execute()
            .then(() => {
              total += currentBatch.length;
              console.log(`Seeded ${total} records...`);
              stream.resume();
            })
            .catch((error) => reject(error));
        } else {
          stream.resume();
        }
      });

      stream.on('end', async () => {
        try {
          if (buffer.length > 0) {
            await this.scoresRepo
              .createQueryBuilder()
              .insert()
              .into(Scores)
              .values(buffer)
              .execute();
            total += buffer.length;
            console.log(`Seeded final ${buffer.length} records.`);
          }

          console.log(`Seeded ${total} records successfully.`);
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      stream.on('error', (error) => reject(error));
    });
  }
}
