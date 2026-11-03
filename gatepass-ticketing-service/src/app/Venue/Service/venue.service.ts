import { AppError } from "../../../lib/error/appError";
import { CreateVenueDTO } from "../dto";
import { Venue } from "../Entity/venue.entity";
import { CreateVenue, GetVenueById, GetVenues } from "../Repo/venue.repo";

export class VenueService {
  CreateVenue = async (data: CreateVenueDTO): Promise<Venue> => {
    return CreateVenue(data.name, data.city, data.capacity);
  };

  GetVenues = async (limit: number, offset: number) => {
    const { data, total } = await GetVenues(limit, offset);
    return {
      data,
      pagination: {
        limit,
        offset,
        total,
        has_more: offset + data.length < total,
      },
    };
  };

  GetVenueById = async (id: number): Promise<Venue> => {
    const venue = await GetVenueById(id);
    if (!venue) {
      throw new AppError("Venue not found", 404);
    }
    return venue;
  };
}
export const venueService = new VenueService();
