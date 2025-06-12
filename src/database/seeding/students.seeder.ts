import { Students } from 'src/modules/students/entities/students.entity';
import { Repository } from 'typeorm';

export class StudentsSeeder {
  constructor(private readonly studentRepo: Repository<Students>) {}

  async seedChunk(buffer: Students[]): Promise<void> {
    await this.studentRepo.save(buffer);
  }
  parse(data: any): Students {
    return {
      sbd: data.sbd,
      ma_ngoai_ngu: data.ma_ngoai_ngu || null,
    };
  }
}
