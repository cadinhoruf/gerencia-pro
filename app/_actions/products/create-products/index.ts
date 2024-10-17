'use server'

import { db } from '@/app/_lib/prisma'
import { CreateProduct, createProductSchema } from './schema'
import { revalidatePath } from 'next/cache'

export const createProduct = async (formData: CreateProduct) => {
  createProductSchema.parse(formData)
  await db.product.create({ data: { ...formData } })
  revalidatePath('/products')
}
