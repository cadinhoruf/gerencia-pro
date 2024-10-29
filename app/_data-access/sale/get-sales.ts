import { db } from '@/app/_lib/prisma'

export interface SalesDto {
  id: string
  productNames: string
  totalProducts: number
  totalAmount: number
  date: Date
}

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { products: { select: { name: true } } }
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
    )
  }))
}
