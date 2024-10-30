import { z } from 'zod'

export const deleteClientSchema = z.object({
  id: z.string().uuid()
})

export type DeleteClientSchema = z.infer<typeof deleteClientSchema>
