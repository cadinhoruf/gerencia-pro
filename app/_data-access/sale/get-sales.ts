import 'server-only'
import { db } from '@/app/_lib/prisma'
import { Client } from '@prisma/client'

export type SaleStatusDto = 'UNDER_REVIEW' | 'AWAITING_PURCHASE' | 'AWAITING_PAYMENT' | 'COMPLETED'

interface SaleProductDto {
  productId: string
  quantity: number
  unitPrice: number
  unitCost: number
  productName: string
  clientName: string
}

export interface SaleDto {
  id: string
  productNames: string
  totalProducts: number
  totalAmount: number
  status: SaleStatusDto
  date: Date
  saleProducts: SaleProductDto[]
  clients: Client[]
  clientName: string
}

export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { products: { select: { name: true } }, client: true }
      }
    }
  })

  return sales.map(sale => ({
    id: sale.id,
    productNames: sale.saleProducts.map(saleProduct => saleProduct.products.name).join(' • '),
    totalProducts: sale.saleProducts.reduce((acc, saleProduct) => acc + saleProduct.quantity, 0),
    date: sale.date,
    totalAmount: sale.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0
    ),
    status: sale.status,
    saleProducts: sale.saleProducts.map(
      (saleProduct): SaleProductDto => ({
        productId: saleProduct.productId,
        productName: saleProduct.products.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
        unitCost: Number(saleProduct.unitCost),
        clientName: saleProduct.client.name
      })
    ),
    clients: sale.saleProducts.map(saleProduct => saleProduct.client),
    clientName: sale.saleProducts.map(saleProduct => saleProduct.client.name)[0]
  }))
}
