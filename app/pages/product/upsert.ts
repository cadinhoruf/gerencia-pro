import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/app/_lib/prisma'
import { upsertProductSchema } from '@/app/_actions/products/upsert-product/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const tenantId = req.headers['x-tenant-id'] as string

    const { id, ...productData } = upsertProductSchema.parse(req.body)

    const product = await db.product.upsert({
      where: { id: id ?? '' },
      update: { ...productData, tenantId },
      create: { ...productData, tenantId }
    })

    return res.status(200).json(product)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to upsert product' })
  }
}
