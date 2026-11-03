import { Router } from 'express';
import { healthRouter } from './app/Health/router';
import { venueRouter } from './app/Venue/route';

export const routes = Router();

routes.use("/health", healthRouter);

routes.use("/venue", venueRouter)