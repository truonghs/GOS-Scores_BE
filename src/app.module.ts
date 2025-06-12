import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';
import { ScoresModule } from './modules/scores/scores.module';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ScoresModule,
    StudentsModule,
  ],
  providers: [],
})
export class AppModule {}
