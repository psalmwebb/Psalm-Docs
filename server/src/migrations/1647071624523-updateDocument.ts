import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDocument1647071624523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('alter table documents add column name varchar(255) not null');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
