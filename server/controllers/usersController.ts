import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../config/dbConfig'
import { UserModel } from "../models/users/model";
import { signAccessToken } from '../utils/jwt'
require("dotenv").config()

// TODO bcrypt password + double confirmation
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body
    await pool.query<UserModel>('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]) as QueryResult<UserModel>

    return res.status(200).json({ access_token: signAccessToken(email, username)})
  } catch (e) {
    console.error(e)
    return res.status(401).json({ message: e.toString() })
  }
}

export const getUserByEmailPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body
    const user = await pool.query<UserModel>('SELECT * FROM users WHERE email = $1 and password = $2', [email, password]) as QueryResult<UserModel>
    console.log(user)

    return res.status(200).json({ access_token: signAccessToken(user.rows[0].email, user.rows[0].username)})
  } catch (e) {
    console.error(e)
    return res.status(401).json({ message: e.toString() })
  }
}