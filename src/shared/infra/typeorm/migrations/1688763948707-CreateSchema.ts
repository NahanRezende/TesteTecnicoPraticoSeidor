import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchema1688763948707 implements MigrationInterface {
    name = 'CreateSchema1688763948707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "drivers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a679ed59119fd25c5e586212f4e" UNIQUE ("name"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying, "license_plate" character varying NOT NULL, "brand" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97deb66a03be534e7c02d9add0a" UNIQUE ("license_plate"), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_scheduling" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date_of_use" TIMESTAMP NOT NULL DEFAULT now(), "end_date_of_use" TIMESTAMP, "reason_for_use" character varying NOT NULL, "driver_id" uuid NOT NULL, "car_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_71c87dd6d80705fbff74d504755" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_scheduling" ADD CONSTRAINT "FK_7580b352d2ed1139692069191ea" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_scheduling" ADD CONSTRAINT "FK_2a18379b6be828384a869a06d6e" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_scheduling" DROP CONSTRAINT "FK_2a18379b6be828384a869a06d6e"`);
        await queryRunner.query(`ALTER TABLE "car_scheduling" DROP CONSTRAINT "FK_7580b352d2ed1139692069191ea"`);
        await queryRunner.query(`DROP TABLE "car_scheduling"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
    }

}
