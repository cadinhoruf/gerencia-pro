import { actionClient } from '@/app/_lib/safe-action'
import { db } from '@/app/_lib/prisma'
import { loginSchema } from './schema'

export const loginAction = actionClient.schema(loginSchema).action(async ({ parsedInput: { email, password } }) => {
  const user = await db.user.findUnique({ where: { email } })
  return user
})
