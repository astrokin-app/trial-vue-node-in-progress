import { Router } from 'express';
import { createUser, getUserByEmailPassword } from '../../controllers/usersController';

export const usersRoute = Router();

usersRoute.post("/login", getUserByEmailPassword)
usersRoute.post("/register", createUser)