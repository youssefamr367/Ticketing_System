import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      venue_id INT NOT NULL,
      start_time TIMESTAMP NOT NULL,
      end_time TIMESTAMP NOT NULL,
      status VARCHAR(50) NOT NULL
        CONSTRAINT events_status_check CHECK (status IN ('draft', 'published', 'cancelled')),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT events_time_order_check CHECK (end_time > start_time),
      CONSTRAINT events_venue_fk FOREIGN KEY (venue_id)
        REFERENCES venues(id) ON DELETE RESTRICT
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw("DROP TABLE events");
}
