import 'server-only'
import { db } from '@/app/_lib/prisma'
import { z } from 'zod'

interface UserDto {
  id: string
  email: string
  password: string
  name: string
  tenantId: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  tenantId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const findUserByEmail = async (email: string): Promise<UserDto> => {
  const user = await db.user.findUnique({
    where: {
      email
    }
  })
  if (!user) throw new Error('Usuário não encontrado.')

  return userSchema.parse(user)
}
