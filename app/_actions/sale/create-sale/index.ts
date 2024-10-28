import { db } from '@/app/_lib/prisma'
import { createSaleSchema, CreateSaleSchema } from './schema'
import { revalidatePath } from 'next/cache'

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data)
  const sale = await db.sale.create({
    data: {
      date: new Date()
    }
  })
  revalidatePath('/sales')
}
