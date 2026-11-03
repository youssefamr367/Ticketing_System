import { db } from "../../../lib/database/knex";
import { Venue } from "../Entity/venue.entity";
import { Knex } from "knex";

const venueRepo = [
  "id",
  "name",
  "city",
  "capacity",
  "created_at",
  "updated_at",
];

function toEntity(row: any): Venue {
  return new Venue({
    id: row.id,
    name: row.name,
    city: row.city,
    capacity: row.capacity,
    created_at: row.created_at,
    updated_at: row.updated_at,
  });
}

export async function CreateVenue(
  name: string,
  city: string,
  capacity: number,
  conn: Knex = db,
): Promise<Venue> {
  const [row] = await conn("venues")
    .insert({ name, city, capacity })
    .returning(venueRepo);
  return toEntity(row);
}

export async function GetVenues(
  limit: number,
  offset: number,
  conn: Knex = db,
): Promise<Venue[]> {
  const rows = await conn("venues")
    .select(venueRepo)
    .orderBy("id", "asc")
    .limit(limit)
    .offset(offset);
  return rows.map(toEntity);
}

export async function GetVenueById(
  id: number,
  conn: Knex = db,
): Promise<Venue | null> {
  const row = await conn("venues").select(venueRepo).where({ id }).first();
  return row ? toEntity(row) : null;
}
