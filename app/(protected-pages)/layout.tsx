import type { Metadata } from 'next'
import '../globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '../_components/sidebart'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], display: 'auto' })

export const metadata: Metadata = {
  title: 'GerenciaPro',
  description: 'Seu gerenciador de estoque e  vendas online'
}

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <div className='flex h-full'>
          <Toaster />
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
