import 'server-only'
import { db } from '@/app/_lib/prisma'
import { Product } from '@prisma/client'

export type ProductStatusDto = 'IN_STOCK' | 'OUT_OF_STOCK' | 'NOT_APPLICABLE'

export interface ProductDto extends Omit<Product, 'price' | 'createdByUserId' | 'updatedByUserId'> {
  price: number
  status: ProductStatusDto
  createdByUserId: string
  updatedByUserId: string
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany()
  return products.map(product => ({
    ...product,
    price: Number(product.price),
    status: product.stock ? (product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK') : 'NOT_APPLICABLE',
    createdByUserId: product.createdByUserId ?? '',
    updatedByUserId: product.updatedByUserId ?? ''
  }))
}
