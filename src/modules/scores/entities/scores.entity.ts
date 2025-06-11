import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Scores')
export class Scores {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  sbd: string;

  @Column({ nullable: true })
  toan?: number;

  @Column({ nullable: true })
  ngu_van?: number;

  @Column({ nullable: true })
  ngoai_ngu?: number;

  @Column({ nullable: true })
  vat_li?: number;

  @Column({ nullable: true })
  hoa_hoc?: number;

  @Column({ nullable: true })
  sinh_hoc?: number;

  @Column({ nullable: true })
  lich_su?: number;

  @Column({ nullable: true })
  dia_li?: number;

  @Column({ nullable: true })
  gdcd?: number;

  @Column({ nullable: true })
  ma_ngoai_ngu?: string;

  static fromCsv(data: Record<string, string>): Partial<Scores> {
    return {
      sbd: data.sbd,
      toan: data.toan ? Number(data.toan) : undefined,
      ngu_van: data.ngu_van ? Number(data.ngu_van) : undefined,
      ngoai_ngu: data.ngoai_ngu ? Number(data.ngoai_ngu) : undefined,
      vat_li: data.vat_li ? Number(data.vat_li) : undefined,
      hoa_hoc: data.hoa_hoc ? Number(data.hoa_hoc) : undefined,
      sinh_hoc: data.sinh_hoc ? Number(data.sinh_hoc) : undefined,
      lich_su: data.lich_su ? Number(data.lich_su) : undefined,
      dia_li: data.dia_li ? Number(data.dia_li) : undefined,
      gdcd: data.gdcd ? Number(data.gdcd) : undefined,
      ma_ngoai_ngu: data.ma_ngoai_ngu || undefined,
    };
  }
}
