import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Students } from 'src/modules/students/entities/students.entity';

@Entity('Scores')
export class Scores {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => Students, (student) => student.scores, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sbd' })
  student: Students;

  @Column({ type: 'float', nullable: true })
  toan?: number;

  @Column({ type: 'float', nullable: true })
  ngu_van?: number;

  @Column({ type: 'float', nullable: true })
  ngoai_ngu?: number;

  @Column({ type: 'float', nullable: true })
  vat_li?: number;

  @Column({ type: 'float', nullable: true })
  hoa_hoc?: number;

  @Column({ type: 'float', nullable: true })
  sinh_hoc?: number;

  @Column({ type: 'float', nullable: true })
  lich_su?: number;

  @Column({ type: 'float', nullable: true })
  dia_li?: number;

  @Column({ type: 'float', nullable: true })
  gdcd?: number;
}
