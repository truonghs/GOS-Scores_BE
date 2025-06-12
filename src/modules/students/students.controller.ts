import { Controller, Get, Param } from '@nestjs/common';
import { GetScoresDto } from 'src/modules/students/dtos/get-scores.dto';
import { StudentsService } from 'src/modules/students/students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/sbd/:sbd')
  async getAllOrders(@Param() getScoresDto: GetScoresDto) {
    return await this.studentsService.getScoresBySBD(getScoresDto);
  }
}
