import { Router } from 'express';
import { createUser, getUser } from '../../controllers/usersController';

export const usersRoute = Router();

// usersRoute.get("/register", (req, res) => {
//   res.json("Register Node-TS!")
// })

// usersRoute.get("/login", (req, res) => {
//   res.json("Login Node-TS!")
// })

usersRoute.post("/login", getUser)
usersRoute.post("/register", createUser)