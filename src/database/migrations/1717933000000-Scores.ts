import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiemThi1717933000000 implements MigrationInterface {
  name = 'CreateDiemThi1717933000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Scores" (
        "id" SERIAL PRIMARY KEY,
        "sbd" VARCHAR NOT NULL,
        "toan" FLOAT NOT NULL,
        "ngu_van" FLOAT NOT NULL,
        "ngoai_ngu" FLOAT NOT NULL,
        "vat_li" FLOAT NOT NULL,
        "hoa_hoc" FLOAT NOT NULL,
        "sinh_hoc" FLOAT NOT NULL,
        "lich_su" FLOAT NOT NULL,
        "dia_li" FLOAT NOT NULL,
        "gdcd" FLOAT NOT NULL,
        "ma_ngoai_ngu" VARCHAR NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "Scores"
    `);
  }
}
