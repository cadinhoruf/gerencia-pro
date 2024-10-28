import 'server-only'

import { db } from '@/app/_lib/prisma'
import { Client } from '@prisma/client'

export const getClients = async (): Promise<Client[]> => {
  return db.client.findMany()
}
