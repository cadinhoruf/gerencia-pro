'use server'

import { actionClient } from '@/app/_lib/safe-action'
import { upsertUserSchema } from './schema'
import { db } from '@/app/_lib/prisma'
import { hashPassword } from '@/app/_utils/hash'

export const upsertUser = actionClient
  .schema(upsertUserSchema)
  .action(async ({ parsedInput: { email, password, role } }) => {
    const hashedPassword = await hashPassword(password)
    const user = await db.user.upsert({
      where: { email },
      update: { email, password: hashedPassword, role },
      create: { email, password: hashedPassword, role }
    })
    return user
  })
