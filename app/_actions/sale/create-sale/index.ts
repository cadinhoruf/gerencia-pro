'use server'
import { db } from '@/app/_lib/prisma'
import { createSaleSchema, CreateSaleSchema } from './schema'
import { revalidatePath } from 'next/cache'

export const createSale = async (data: CreateSaleSchema) => {
  await db.$transaction(async trx => {
    createSaleSchema.parse(data)
    const sale = await trx.sale.create({
      data: {
        date: new Date()
      }
    })

    for (const product of data.products) {
      const productFromDb = await db.product.findUnique({
        where: {
          id: product.id
        }
      })
      await trx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: Number(productFromDb?.price),
          clientId: data.clientId
        }
      })
    }
  })
  revalidatePath('/sales')
}
