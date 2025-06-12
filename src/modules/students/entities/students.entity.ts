import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Scores } from 'src/modules/scores/entities/scores.entity';

@Entity('Students')
export class Students {
  @PrimaryColumn()
  sbd: string;

  @Column({ nullable: true })
  ma_ngoai_ngu?: string;

  @OneToOne(() => Scores, (scores) => scores.student)
  scores?: Scores;
}
