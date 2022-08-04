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
    await queryRunner.query(
      `CREATE TABLE "customer_driver_matched" ("id" SERIAL NOT NULL, "customer_id" integer NOT NULL, "driver_id" integer NOT NULL, "is_matched" boolean NOT NULL, CONSTRAINT "PK_7919a4d2985c4570c7d9213c9e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_driver_matched" ADD CONSTRAINT "FK_b74710275368ab583da7cb48ca4" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_driver_matched" ADD CONSTRAINT "FK_67265058aeee8a5daeddf7d3b92" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer_driver_matched" DROP CONSTRAINT "FK_67265058aeee8a5daeddf7d3b92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer_driver_matched" DROP CONSTRAINT "FK_b74710275368ab583da7cb48ca4"`,
    );
    await queryRunner.query(`DROP TABLE "customer_driver_matched"`);
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
