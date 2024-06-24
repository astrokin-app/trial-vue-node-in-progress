import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../config/dbConfig'
import { UserModel } from "../models/users/model";
import { signAccessToken } from '../utils/jwt'
import { hashPassword, checkPassword } from '../utils/bcrypt';
require("dotenv").config()

// TODO bcrypt password + double confirmation
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body
    const hashedPassword = await hashPassword(password) as { hash: string, salt: string}
    const hashPwd = hashedPassword.hash
    const saltPwd = hashedPassword.salt
    await pool.query<UserModel>('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashPwd + '|' + saltPwd]) as QueryResult<UserModel>

    return res.status(200).json({ access_token: signAccessToken(email, username)})
  } catch (e) {
    return res.status(401).json({ message: e.toString() })
  }
}

export const getUserByEmailPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body
    const user = await pool.query<UserModel>('SELECT * FROM users WHERE email = $1', [email]) as QueryResult<UserModel>
    const validPassword = await checkPassword(user.rows[0].password.split('|')[0], password)

    if (validPassword) return res.status(200).json({ access_token: signAccessToken(user.rows[0].email, user.rows[0].username)})
    else return res.status(401).json({ message: 'Error login!' })
  } catch (e) {
    return res.status(401).json({ message: e.toString() })
  }
}