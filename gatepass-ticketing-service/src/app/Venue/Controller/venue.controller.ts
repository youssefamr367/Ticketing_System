import { NextFunction, Response, Request } from "express";
import { venueService, VenueService } from "../Service/venue.service";
import { CreateVenueDTO } from "../dto";
import { validateBody } from "../../../lib/validation/validate";

export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  CreateVenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await validateBody(CreateVenueDTO, req.body);
      const venue = await this.venueService.CreateVenue(data);
      res.status(201).json(venue);
    } catch (error) {
      next(error);
    }
  };

  GetVenues = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const venues = await this.venueService.GetVenues(limit, offset);
      res.status(200).json(venues);
    } catch (error) {
      next(error);
    }
  };

  GetVenueById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = Number.parseInt(req.params.id, 10);
      const venue = await this.venueService.GetVenueById(id);
      res.status(200).json(venue);
    } catch (error) {
      next(error);
    }
  };
}
export const venueController = new VenueController(venueService);
