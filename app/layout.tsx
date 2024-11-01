import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GerenciaPro',
  description: 'Seu gerenciador de estoque e vendas online'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.className} antialiased`}>
        <Toaster /> /{children}
      </body>
    </html>
  )
}
