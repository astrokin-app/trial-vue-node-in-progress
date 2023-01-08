import { Router } from 'express';

export const usersRoute = Router();

usersRoute.get("/users/register", (req, res) => {
  res.json("Register Node-TS!")
})

usersRoute.get("/users/login", (req, res) => {
  res.json("Login Node-TS!")
})