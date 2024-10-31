import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], display: 'auto' })

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <div className='flex h-full'>
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  )
}
