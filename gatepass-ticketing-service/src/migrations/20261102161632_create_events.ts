import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
   knex.raw(`CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) not null,
        venue_id INT not null,
        start_time TIMESTAMP,
        end_time TIMESTAMP constraint Postive check(end_time > start_time) not null,
        status VARCHAR(50) constraint status_check check(status in ('draft', 'published', 'cancelled')) not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        Constraint fk_venue_id foreign key (venue_id) references venues(id) ON DELETE CASCADE
    `);
}


export async function down(knex: Knex): Promise<void> {
    knex.raw(`DROP TABLE events`);
}

