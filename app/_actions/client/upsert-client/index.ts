'use server'
import { db } from '@/app/_lib/prisma'
import { upsertClientSchema } from './schema'
import { actionClient } from '@/app/_lib/safe-action'
import { revalidatePath } from 'next/cache'

export const upsertClient = actionClient.schema(upsertClientSchema).action(async ({ parsedInput: { id, ...data } }) => {
  upsertClientSchema.parse(data)
  await db.client.upsert({
    where: { id: id ?? '' },
    update: data,
    create: data
  })
  revalidatePath('/clients', 'page')
})
