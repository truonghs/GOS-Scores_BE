import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Scores } from 'src/modules/scores/entities/scores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Scores])],
  providers: [ScoresService],
  controllers: [ScoresController],
})
export class ScoresModule {}
