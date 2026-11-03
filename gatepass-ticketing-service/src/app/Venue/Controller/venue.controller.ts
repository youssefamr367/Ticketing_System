import type { NextFunction, Response, Request } from "express";
import { venueService, VenueService } from "../Service/venue.service";
import { CreateVenueDTO } from "../dto";
import { validateBody } from "../../../lib/validation/validate";
import { AppError } from "../../../lib/error/appError";

const MAX_DB_INT = 2147483647;

function parseIntegerParam(
  value: unknown,
  field: string,
  min: number,
  max: number,
): number {
  if (typeof value !== "string" || !/^(0|[1-9][0-9]*)$/.test(value)) {
    throw new AppError(`Invalid ${field}`, 400);
  }
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < min || number > max) {
    throw new AppError(`Invalid ${field}`, 400);
  }
  return number;
}

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
      const limit = req.query.limit === undefined
        ? 20
        : parseIntegerParam(req.query.limit, "limit", 1, 100);
      const offset = req.query.offset === undefined
        ? 0
        : parseIntegerParam(req.query.offset, "offset", 0, MAX_DB_INT);
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
      const id = parseIntegerParam(req.params.id, "venue ID", 1, MAX_DB_INT);
      const venue = await this.venueService.GetVenueById(id);
      res.status(200).json(venue);
    } catch (error) {
      next(error);
    }
  };
}
export const venueController = new VenueController(venueService);
