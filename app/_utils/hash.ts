import { compare } from 'bcrypt'
import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}

export { hashPassword, comparePassword }
