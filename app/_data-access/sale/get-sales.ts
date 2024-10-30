import { db } from '@/app/_lib/prisma'

export type SaleStatusDto = 'UNDER_REVIEW' | 'AWAITING_PURCHASE' | 'AWAITING_PAYMENT' | 'COMPLETED'

export interface SalesDto {
  id: string
  productNames: string
  totalProducts: number
  totalAmount: number
  clientName: string
  status: SaleStatusDto
  date: Date
}

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { products: { select: { name: true } }, client: { select: { name: true } } }
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
    clientName: sale.saleProducts.map(saleProduct => saleProduct.client.name)[0],
    status: sale.status
  }))
}
