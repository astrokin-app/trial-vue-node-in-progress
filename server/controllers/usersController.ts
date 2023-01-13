import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../config/dbConfig'
import { signAccessToken } from '../utils/jwt'
require("dotenv").config()

// TODO bcrypt password && model user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body
    const response: QueryResult = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password])

    if (!response.rowCount) {
      return res.status(401).json({ message: 'Error. User Not Created.' })
    }

    return res.status(200).json({ access_token: signAccessToken(email, password) })

  } catch (e) {
    console.log(e)
    throw new Error(`createUser - ERROR: ${e.toString()}`);
  }
}

export const getUserByEmailPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE email = $1 and password = $2', [email, password])
    console.log('ENDPOINT LOGIN', response)

    if (!response.rows[0]) {
      return res.status(401).json({ message: 'Error. User Not Found.' })
    }

    return res.status(200).json({ access_token: signAccessToken(email, password) })

  } catch (e) {
    console.log(e)
    throw new Error(`getUserByEmailPassword - ERROR: ${e.toString()}`);
  }
}