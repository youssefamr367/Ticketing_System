import { Router } from "express";
import { CreateVenue } from "./Repo/venue.repo";
import { venueController } from "./Controller/venue.controller";

export const venueRouter = Router();

venueRouter.post("/", venueController.CreateVenue);
venueRouter.get("/", venueController.GetVenues);
venueRouter.get("/:id", venueController.GetVenueById);