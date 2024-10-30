'use server'

import { db } from '@/app/_lib/prisma'
import { revalidatePath } from 'next/cache'
import { actionClient } from '@/app/_lib/safe-action'
import { deleteClientSchema } from './schema'

export const deleteClient = actionClient.schema(deleteClientSchema).action(async ({ parsedInput: { id } }) => {
  await db.client.delete({
    where: {
      id
    }
  })
  revalidatePath('/', 'layout')
})
