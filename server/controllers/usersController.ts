import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../config/dbConfig'

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body
    const response: QueryResult = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password])
    console.log('ENDPOINT REGISTER', response)
    return res.status(200).send(response.rows[0])
  } catch (e) {
    console.log(e)
    if (e.toString().indexOf('no pg_hba.conf entry for host') !== -1) {
      throw new Error(`Please use CUBEJS_DB_SSL=true to connect: ${e.toString()}`);
  }
    throw e;
  }
}

export const getUserByEmailPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE email = $1 and password = $2', [email, password])
    console.log('ENDPOINT LOGIN', response)
    return res.status(200).send(response.rows[0])
  } catch (e) {
    console.log(e)
    if (e.toString().indexOf('no pg_hba.conf entry for host') !== -1) {
      throw new Error(`Please use CUBEJS_DB_SSL=true to connect: ${e.toString()}`);
  }
    throw e;
  }
}