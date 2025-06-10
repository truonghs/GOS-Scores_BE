import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('Scores')
export class Scores {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  sbd: string;

  @Column()
  toan: number;

  @Column()
  ngu_van: number;

  @Column()
  ngoai_ngu: number;

  @Column()
  vat_li: number;

  @Column()
  hoa_hoc: number;

  @Column()
  sinh_hoc: number;

  @Column()
  lich_su: number;

  @Column()
  dia_li: number;

  @Column()
  gdcd: number;

  @Column()
  ma_ngoai_ngu: string;

  static fromCsv(data: Record<string, string>): Partial<Scores> {
    return {
      sbd: data.sbd,
      toan: Number(data.toan),
      ngu_van: Number(data.ngu_van),
      ngoai_ngu: Number(data.ngoai_ngu),
      vat_li: Number(data.vat_li),
      hoa_hoc: Number(data.hoa_hoc),
      sinh_hoc: Number(data.sinh_hoc),
      lich_su: Number(data.lich_su),
      dia_li: Number(data.dia_li),
      gdcd: Number(data.gdcd),
      ma_ngoai_ngu: data.ma_ngoai_ngu,
    };
  }
}
