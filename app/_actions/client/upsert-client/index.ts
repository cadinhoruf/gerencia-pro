import { db } from '@/app/_lib/prisma'
import { upsertClientSchema, UpsertClientSchema } from './schema'
import { revalidatePath } from 'next/cache'

export const upsertClient = async (data: UpsertClientSchema) => {
  upsertClientSchema.parse(data)
  await db.client.upsert({ where: { id: data.id ?? '' }, update: data, create: data })
  revalidatePath('/clients')
}
