import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { Scores } from 'src/modules/scores/entities/scores.entity';
import { ScoresSeeder } from 'src/database/seeding/scores-seeder';
import AppDataSource from 'typeorm.config';

dotenv.config();

async function run() {
  await AppDataSource.initialize();
  const scoresRepo = AppDataSource.getRepository(Scores);
  const seeder = new ScoresSeeder(scoresRepo);
  await seeder.seed();
  await AppDataSource.destroy();
}

run()
  .then(() => {
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding ended with error:', error);
    process.exit(1);
  });
