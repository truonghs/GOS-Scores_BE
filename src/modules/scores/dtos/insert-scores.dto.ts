import { Entity, Column } from 'typeorm';
@Entity('diem_thi_thpt_2024')
export class InsertScoresDTO {
  @Column()
  sbd?: string;

  @Column({ type: 'float' })
  toan?: number;

  @Column({ type: 'float' })
  ngu_van?: number;

  @Column({ type: 'float' })
  ngoai_ngu?: number;

  @Column({ type: 'float' })
  vat_li?: number;

  @Column({ type: 'float' })
  hoa_hoc?: number;

  @Column({ type: 'float' })
  sinh_hoc?: number;

  @Column({ type: 'float' })
  lich_su?: number;

  @Column({ type: 'float' })
  dia_li?: number;

  @Column({ type: 'float' })
  gdcd?: number;

  @Column()
  ma_ngoai_ngu?: string;
}
