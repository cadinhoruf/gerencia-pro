'use server'

import { db } from '@/app/_lib/prisma'
import { upsertSaleSchema } from './schema'
import { revalidatePath } from 'next/cache'
import { actionClient } from '@/app/_lib/safe-action'
import { returnValidationErrors } from 'next-safe-action'

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id, clientId } }) => {
    const isUpdate = Boolean(id)
    await db.$transaction(async trx => {
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProducts: true }
        })
        if (!existingSale) return
        await trx.sale.delete({
          where: { id }
        })
        for (const product of existingSale.saleProducts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity
              }
            }
          })
        }
      }
      const sale = await trx.sale.create({
        data: {
          date: new Date()
        }
      })
      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: {
            id: product.id
          }
        })
        if (!productFromDb) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ['Produto não encontrado.']
          })
        }
        const productHaveStock = productFromDb.stock !== null ? productFromDb.stock : 0
        const productIsOutOfStock = product.quantity > productHaveStock
        if (productIsOutOfStock) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ['Produto fora de estoque.']
          })
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
            clientId: clientId
          }
        })
        await trx.product.update({
          where: {
            id: product.id
          },
          data: {
            stock: {
              decrement: product.quantity
            }
          }
        })
      }
    })
    revalidatePath('/', 'layout')
  })
