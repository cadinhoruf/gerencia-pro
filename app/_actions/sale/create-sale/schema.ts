import { z } from 'zod'

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number()
    })
  ),
  clientId: z.string().uuid()
})

export type CreateSaleSchema = z.infer<typeof createSaleSchema>
