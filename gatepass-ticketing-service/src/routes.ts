import { Router } from 'express';
import { healthRouter } from './app/Health/router';

export const routes = Router();

routes.use("/health", healthRouter);