import { Controller, Get, Param } from '@nestjs/common';
import { GetScoresDto } from 'src/modules/students/dtos/get-scores.dto';
import { ScoresService } from 'src/modules/scores/scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get('/statistics')
  async getStatisticsData() {
    return await this.scoresService.getStatisticsData();
  }

  @Get('/top-group-a')
  async getTop10GroupA() {
    return this.scoresService.getTop10GroupA();
  }
}
