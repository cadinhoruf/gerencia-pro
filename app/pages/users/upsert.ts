import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/app/_lib/prisma'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library'

const userSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  tenantId: z.string()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id, ...parsedData } = userSchema.parse(req.body)

      const hashedPassword = await bcrypt.hash(parsedData.password, 10)

      const user = await db.user.upsert({
        where: { id: id ?? '' },
        update: { ...parsedData, password: hashedPassword, tenantId: parsedData.tenantId },
        create: { ...parsedData, password: hashedPassword, tenantId: parsedData.tenantId }
      })

      res.status(201).json(user)
    } catch (error: PrismaClientUnknownRequestError | any) {
      res.status(400).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
