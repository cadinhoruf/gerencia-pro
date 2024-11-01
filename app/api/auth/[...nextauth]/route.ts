import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/app/_lib/prisma'
import { comparePassword } from '@/app/_utils/hash'
import { loginSchema } from '@/app/_lib/schemas/auth'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const user = await db.user.findUnique({ where: { email } })
        if (!user) {
          throw new Error('Usuário não encontrado')
        }

        const isValid = await comparePassword(password, user.password!)
        if (!isValid) {
          throw new Error('Senha incorreta')
        }

        return { id: user.id, name: user.name, email: user.email, role: user.role }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          role: token.role as string
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
      }
      return token
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }
