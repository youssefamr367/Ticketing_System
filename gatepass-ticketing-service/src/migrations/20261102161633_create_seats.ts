import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE seats (
      id SERIAL PRIMARY KEY,
      venue_id INT NOT NULL,
      section VARCHAR(50) NOT NULL,
      "row" VARCHAR(50) NOT NULL,
      seat_number INT NOT NULL
        CONSTRAINT seats_number_positive CHECK (seat_number > 0),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT seats_venue_fk FOREIGN KEY (venue_id)
        REFERENCES venues(id) ON DELETE RESTRICT,
      CONSTRAINT seats_unique_position UNIQUE (venue_id, section, "row", seat_number)
    )
      Create index idx_seats_venue_id ON seats(venue_id)
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw("DROP TABLE seats");
}
