import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from 'src/modules/students/entities/students.entity';
import { GetScoresDto } from 'src/modules/students/dtos/get-scores.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private readonly studentRepo: Repository<Students>,
  ) {}

  async getScoresBySBD(getScoresDTO: GetScoresDto) {
    const studentWithScores = await this.studentRepo.findOne({
      where: { sbd: getScoresDTO.sbd },
      relations: ['scores'],
    });

    if (!studentWithScores) return null;
    return studentWithScores.scores;
  }
}
