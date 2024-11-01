import { z } from 'zod'

const userRole = z.enum(['ADMIN', 'USER'])

export const upsertUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: userRole
})
