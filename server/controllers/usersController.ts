import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../config/dbConfig'
import jwt from 'jsonwebtoken'
require("dotenv").config()

// TODO bcrypt password && model user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body
    const response: QueryResult = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password])

    if (!response.rowCount) {
      return res.status(401).json({ message: 'Error. User Not Created.' })
    }

    const token = jwt.sign({
      username: username,
      email: email
    }, process.env.JWT_SECRET!, { expiresIn: '3 hours' })

    return res.status(200).json({ access_token: token })

  } catch (e) {
    console.log(e)
    throw new Error(`ERROR CREATE USER: ${e.toString()}`);
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

    const token = jwt.sign({
      username: response.rows[0].username,
      email: response.rows[0].email
    }, process.env.JWT_SECRET!, { expiresIn: '3 hours' })

    return res.status(200).json({ access_token: token })

  } catch (e) {
    console.log(e)
    throw new Error(`ERROR GET USER BY EMAIL PASSWORD: ${e.toString()}`);
  }
}