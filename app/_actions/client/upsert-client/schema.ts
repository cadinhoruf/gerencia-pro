import { z } from 'zod'

export const upsertClientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: 'A razão social é obrigatória' }),
  contactName: z.string().trim().min(1, { message: 'O contato é obrigatório' }),
  contactNumber: z
    .string()
    .trim()
    .min(1, { message: 'O contato é obrigatório' })
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Número de telefone inválido' })
})

export type UpsertClientSchema = z.infer<typeof upsertClientSchema>
