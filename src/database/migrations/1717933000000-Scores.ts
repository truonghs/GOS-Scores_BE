import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateScores1717933000000 implements MigrationInterface {
  name = 'CreateScores1717933000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Scores" (
        "id" SERIAL PRIMARY KEY,
        "sbd" VARCHAR,
        "toan" FLOAT,
        "ngu_van" FLOAT,
        "ngoai_ngu" FLOAT,
        "vat_li" FLOAT,
        "hoa_hoc" FLOAT,
        "sinh_hoc" FLOAT,
        "lich_su" FLOAT,
        "dia_li" FLOAT,
        "gdcd" FLOAT,
        "ma_ngoai_ngu" VARCHAR
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "Scores"
    `);
  }
}
