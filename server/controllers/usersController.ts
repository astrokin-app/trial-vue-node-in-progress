import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../config/dbConfig'

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const {name, email, password} = req.body
  // const response: QueryResult = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password])
  // return res.status(200).json('Success')
  return res.json({
    message: 'User created successfully',
    body: {
      user: {
        name,
        email
      }
    }
  })
}