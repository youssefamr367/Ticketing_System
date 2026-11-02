import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  knex.raw(`CREATE TABLE venues (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) not null,
        city VARCHAR(255) not null,
        Capacity INT constraint Postive check(Capacity > 0) not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `);
}

export async function down(knex: Knex): Promise<void> {
  knex.raw(`DROP TABLE venues`);
}
