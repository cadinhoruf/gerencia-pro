import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'O email é obrigatório').email('Formato de email inválido'),
  password: z.string().min(1, 'A senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export type LoginSchema = z.infer<typeof loginSchema>
