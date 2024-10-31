import { z } from 'zod'

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
  price: z.number().min(0.01, { message: 'O valor é obrigatório' }),
  stock: z.coerce.number().nullish(),
  cost: z.coerce.number(),
  userId: z.string().uuid()
})

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>
