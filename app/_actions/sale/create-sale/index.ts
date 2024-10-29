'use server'
import { db } from '@/app/_lib/prisma'
import { createSaleSchema } from './schema'
import { revalidatePath } from 'next/cache'
import { actionClient } from '@/app/_lib/safe-action'
import { returnValidationErrors } from 'next-safe-action'

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products, clientId } }) => {
    await db.$transaction(async trx => {
      const sale = await trx.sale.create({
        data: {
          date: new Date()
        }
      })

      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id
          }
        })
        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ['Produto não encontrado.']
          })
        }
        if (productFromDb.stock !== null) {
          const productIsOutOfStock = product.quantity > productFromDb.stock

          if (productIsOutOfStock) {
            returnValidationErrors(createSaleSchema, {
              _errors: ['Produto sem estoque.']
            })
          }
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: Number(productFromDb?.price),
            clientId: clientId
          }
        })
      }
    })
    revalidatePath('/sales')
  })
