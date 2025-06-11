import { Controller, Get, Param } from '@nestjs/common';
import { GetScoresDto } from 'src/modules/scores/dtos/get-scores.dto';
import { ScoresService } from 'src/modules/scores/scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get('/sbd/:sbd')
  async getAllOrders(@Param() getScoresDto: GetScoresDto) {
    return await this.scoresService.getScoresBySBD(getScoresDto);
  }

  @Get('/statistics')
  async getStatisticsData() {
    return await this.scoresService.getStatisticsData();
  }

  @Get('/top-group-a')
  async getTop10GroupA() {
    return this.scoresService.getTop10GroupA();
  }
}
