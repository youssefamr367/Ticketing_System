import { db } from "../../../lib/database/knex";
import { Venue } from "../Entity/venue.entity";
import type { Knex } from "knex";

const venueColumns = ["id", "name", "city", "capacity", "created_at", "updated_at"];

type VenueRow = {
  id: number;
  name: string;
  city: string;
  capacity: number;
  created_at: Date;
  updated_at: Date;
};

function toEntity(row: VenueRow): Venue {
  return new Venue(row);
}

export async function CreateVenue(
  name: string,
  city: string,
  capacity: number,
  conn: Knex = db,
): Promise<Venue> {
  const [row] = await conn("venues")
    .insert({ name, city, capacity })
    .returning(venueColumns);
  return toEntity(row);
}

export async function GetVenues(
  limit: number,
  offset: number,
  conn: Knex = db,
): Promise<{ data: Venue[]; total: number }> {
  const [rows, countRow] = await Promise.all([
    conn("venues").select(venueColumns).orderBy("id", "asc").limit(limit).offset(offset),
    conn("venues").count<{ count: string }>("id as count").first(),
  ]);
  const total = Number(countRow?.count ?? 0);
  return { data: rows.map(toEntity), total };
}

export async function GetVenueById(
  id: number,
  conn: Knex = db,
): Promise<Venue | null> {
  const row = await conn("venues").select(venueColumns).where({ id }).first();
  return row ? toEntity(row) : null;
}
