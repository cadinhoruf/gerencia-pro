import { z } from 'zod'

export const upsertClientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: 'A razão social é obrigatória' }),
  contactName: z.string().trim().min(1, { message: 'A pessoa de contato é obrigatória' }),
  contactNumber: z.string().trim().min(1, { message: 'O número de contato é obrigatório' }),
  cnpj: z.string().optional(),
  cpf: z.string().optional(),
  address: z.string().trim().min(1, { message: 'O endereço é obrigatório' }),
  createdByUserId: z.string().uuid(),
  updatedByUserId: z.string().uuid().optional()
})

export type UpsertClientSchema = z.infer<typeof upsertClientSchema>
