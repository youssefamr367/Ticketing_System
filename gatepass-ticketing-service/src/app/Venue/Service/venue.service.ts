import { AppError } from "../../../lib/error/appError";
import { CreateVenueDTO } from "../dto";
import { Venue } from "../Entity/venue.entity";
import { CreateVenue, GetVenueById, GetVenues } from "../Repo/venue.repo";

export class VenueService {
  CreateVenue = async (data: CreateVenueDTO): Promise<Venue> => {
    const venue = await CreateVenue(
      data.neeme,
      data.city,
      parseInt(data.capacity),
    );
    return venue;
  };

  GetVenues = async (limit: number, offset: number): Promise<Venue[]> => {
    const venues = await GetVenues(limit, offset);
    return venues;
  };

  GetVenueById = async (id: number): Promise<Venue | null> => {
    const venue = await GetVenueById(id);
    if (!venue) {
      throw new AppError(`Venue with ID ${id} not found`, 404);
    }
    return venue;
  };
}
export const venueService = new VenueService();
