import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMigration1659623398061 implements MigrationInterface {
  name = 'initMigration1659623398061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location_latitude" double precision NOT NULL, "location_longitude" double precision NOT NULL, "number_of_rides" integer NOT NULL, "rating" real NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location_latitude" double precision NOT NULL, "location_longitude" double precision NOT NULL, "number_of_rides" integer NOT NULL, "rating" real NOT NULL, CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
