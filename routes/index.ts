import express from 'express';
import { defaultRoute } from './defaultRoute';
import { usersRoute } from './users/route';

export const routes = express.Router();

routes.use(defaultRoute, usersRoute);