import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.raw(`Create Table seats(
        id SERIAL PRIMARY KEY,
        venue_id INT not null,
        section VARCHAR(50) not null,
        row VARCHAR(50) not null,
        seat_number INT constraint Postive check(seat_number > 0) not null,
        status VARCHAR(50) constraint status_check check(status in ('available', 'reserved', 'sold')) not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    Constraint fk_venue_id foreign key (venue_id) references venues(id) ON DELETE CASCADE
    `);
}


export async function down(knex: Knex): Promise<void> {
    knex.raw(`DROP TABLE seats`)
}

