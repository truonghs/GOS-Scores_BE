import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SUBJECTS } from 'src/common/constant';
import { LEVELS } from 'src/common/enums';
import { GetScoresDto } from 'src/modules/scores/dtos/get-scores.dto';
import { Scores } from 'src/modules/scores/entities/scores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Scores)
    private readonly scoresRepository: Repository<Scores>,
  ) {}

  async getScoresBySBD(getScoresDTO: GetScoresDto) {
    return await this.scoresRepository.findOne({
      where: { sbd: getScoresDTO.sbd },
    });
  }

  private levels = [
    { name: LEVELS.EXCELLENT, preCondition: '>= 8' },
    { name: LEVELS.GOOD, preCondition: '>= 6', andCondition: '< 8' },
    { name: LEVELS.AVERAGE, preCondition: '>= 4', andCondition: '< 6' },
    { name: LEVELS.WEAK, preCondition: '< 4' },
  ];

  async getStatisticsData() {
    const result: Array<{}> = [];

    for (const subject of SUBJECTS) {
      const subjectObj = { subject };
      for (const level of this.levels) {
        const count = await this.scoresRepository
          .createQueryBuilder('score')
          .where(
            `score.${subject} ${level.preCondition} ${level.andCondition ? `AND score.${subject} ${level.andCondition}` : ''}`,
          )
          .andWhere(`score.${subject} IS NOT NULL`)
          .getCount();
        subjectObj[level.name] = count;
      }
      result.push(subjectObj);
    }

    return result;
  }
  async findTop10GroupAStudents(): Promise<Scores[]> {
    const students = await this.scoresRepository
      .createQueryBuilder('score')
      .where('score.toan IS NOT NULL')
      .andWhere('score.vat_li IS NOT NULL')
      .andWhere('score.hoa_hoc IS NOT NULL')
      .orderBy('(score.toan + score.vat_li + score.hoa_hoc)', 'DESC')
      .take(10)
      .getMany();

    return students;
  }
}
