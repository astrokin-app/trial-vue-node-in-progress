import jwt from 'jsonwebtoken'

export const signAccessToken = (email: string, username: string): string => {
  const token = jwt.sign({
    username: username,
    email: email
  }, process.env.JWT_SECRET!, { expiresIn: '3 hours' })

  return token
}