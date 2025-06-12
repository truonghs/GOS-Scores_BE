import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudentsAndScores1717933000000
  implements MigrationInterface
{
  name = 'CreateStudentsAndScores1717933000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Students" (
        "sbd" VARCHAR PRIMARY KEY,
        "ma_ngoai_ngu" VARCHAR
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "Scores" (
        "id" SERIAL PRIMARY KEY,
        "toan" FLOAT,
        "ngu_van" FLOAT,
        "ngoai_ngu" FLOAT,
        "vat_li" FLOAT,
        "hoa_hoc" FLOAT,
        "sinh_hoc" FLOAT,
        "lich_su" FLOAT,
        "dia_li" FLOAT,
        "gdcd" FLOAT,
        "sbd" VARCHAR UNIQUE,
        CONSTRAINT "FK_student_sbd" FOREIGN KEY ("sbd") REFERENCES "Students"("sbd") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "Scores"
    `);
    await queryRunner.query(`
      DROP TABLE "Students"
    `);
  }
}
