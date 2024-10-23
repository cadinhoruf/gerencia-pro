'use server'

import { db } from '@/app/_lib/prisma'
import { revalidatePath } from 'next/cache'
import { deleteProductSchema, DeleteProductSchema } from './schema'

export const deleteProduct = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id })
  await db.product.delete({ where: { id } })
  revalidatePath('/products')
}
