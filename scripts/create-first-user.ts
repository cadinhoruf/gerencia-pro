import { db } from '@/app/_lib/prisma'
import { hashPassword } from '@/app/_utils/hash'

export const createFirstUser = async () => {
  const usersCount = await db.user.count()

  if (usersCount === 0) {
    const hashedPassword = await hashPassword('123456')
    await db.user.create({
      data: {
        name: 'Ricardo Rufino',
        email: 'cadinhorufjr@icloud.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    console.log('Usuário admin criado com sucesso')
  } else {
    console.log('Já existe um usuário no sistema')
  }
}

createFirstUser()
