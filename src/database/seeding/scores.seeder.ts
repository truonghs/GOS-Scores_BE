import { Scores } from 'src/modules/scores/entities/scores.entity';
import { Repository } from 'typeorm';

export class ScoresSeeder {
  constructor(private readonly scoresRepo: Repository<Scores>) {}

  async seedChunk(buffer: Scores[]): Promise<void> {
    await this.scoresRepo
      .createQueryBuilder()
      .insert()
      .into(Scores)
      .values(buffer)
      .execute();
  }

  parse(data: any): Scores {
    return {
      student: { sbd: data.sbd },
      toan: data.toan ? Number(data.toan) : undefined,
      ngu_van: data.ngu_van ? Number(data.ngu_van) : undefined,
      ngoai_ngu: data.ngoai_ngu ? Number(data.ngoai_ngu) : undefined,
      vat_li: data.vat_li ? Number(data.vat_li) : undefined,
      hoa_hoc: data.hoa_hoc ? Number(data.hoa_hoc) : undefined,
      sinh_hoc: data.sinh_hoc ? Number(data.sinh_hoc) : undefined,
      lich_su: data.lich_su ? Number(data.lich_su) : undefined,
      dia_li: data.dia_li ? Number(data.dia_li) : undefined,
      gdcd: data.gdcd ? Number(data.gdcd) : undefined,
    };
  }
}
