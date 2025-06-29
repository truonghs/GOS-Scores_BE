import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scores } from 'src/modules/scores/entities/scores.entity';
import { GetScoresDto } from 'src/modules/students/dtos/get-scores.dto';
import { SUBJECTS } from 'src/common/constant';
import { LEVELS } from 'src/common/enums';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Scores)
    private readonly scoresRepository: Repository<Scores>,
  ) {}

  private levels = [
    { name: LEVELS.EXCELLENT, preCondition: '>= 8' },
    { name: LEVELS.GOOD, preCondition: '>= 6', andCondition: '< 8' },
    { name: LEVELS.AVERAGE, preCondition: '>= 4', andCondition: '< 6' },
    { name: LEVELS.WEAK, preCondition: '< 4' },
  ];

  async getStatisticsData() {
    const result: Array<any> = [];

    for (const subject of SUBJECTS) {
      const subjectObj: any = { subject };
      for (const level of this.levels) {
        const count = await this.scoresRepository
          .createQueryBuilder('score')
          .where(
            `score.${subject} ${level.preCondition} ${
              level.andCondition
                ? `AND score.${subject} ${level.andCondition}`
                : ''
            }`,
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
    return this.scoresRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.student', 'student')
      .where('score.toan IS NOT NULL')
      .andWhere('score.vat_li IS NOT NULL')
      .andWhere('score.hoa_hoc IS NOT NULL')
      .orderBy('(score.toan + score.vat_li + score.hoa_hoc)', 'DESC')
      .take(10)
      .getMany();
  }

  async getTop10GroupA(): Promise<Scores[]> {
    return this.scoresRepository
      .createQueryBuilder('scores')
      .leftJoinAndSelect('scores.student', 'student')
      .where('scores.toan IS NOT NULL')
      .andWhere('scores.vat_li IS NOT NULL')
      .andWhere('scores.hoa_hoc IS NOT NULL')
      .addSelect('scores.toan + scores.vat_li + scores.hoa_hoc', 'total')
      .orderBy('total', 'DESC')
      .limit(10)
      .getMany();
  }
}
