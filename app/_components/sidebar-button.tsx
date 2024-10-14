'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'

interface SidebarButtonProps {
  href: string
  children: React.ReactNode
}

const SidebarButton = ({ href, children }: SidebarButtonProps) => {
  const pathname = usePathname()
  return (
    <Button variant={pathname === `${href}` ? 'secondary' : 'ghost'} className='justify-start gap-2' asChild>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default SidebarButton
