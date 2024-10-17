import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
  price: z.number().min(0.01, { message: 'O valor é obrigatório' }),
  stock: z.coerce
    .number()
    .positive({ message: 'A quantidade em estoque deve ser positiva' })
    .min(1, { message: 'A quantidade é obrigatório' })
})

export type CreateProduct = z.infer<typeof createProductSchema>
