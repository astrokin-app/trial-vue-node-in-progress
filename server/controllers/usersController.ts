import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../config/dbConfig'
import { signAccessToken } from '../utils/jwt'
require("dotenv").config()

// TODO bcrypt password && model user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]) as QueryResult

    return res.status(200).json({ access_token: signAccessToken(email, password) })
  } catch (e) {
    console.error(e)
    return res.status(401).json({ message: e.toString() })
  }
}

export const getUserByEmailPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body
    await pool.query('SELECT * FROM users WHERE email = $1 and password = $2', [email, password]) as QueryResult

    return res.status(200).json({ access_token: signAccessToken(email, password) })
  } catch (e) {
    console.error(e)
    return res.status(401).json({ message: e.toString() })
  }
}