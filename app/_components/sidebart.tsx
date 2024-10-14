import Image from 'next/image'
import { LayoutGrid, Package, ShoppingBasket } from 'lucide-react'
import SidebarButton from './sidebar-button'

const Sidebar = () => {
  return (
    <div className='flex h-screen w-64 flex-col bg-white'>
      <div className='p-4'>
        <Image width={130} height={130} src='/logo-toca.avif' alt='Logo Toca do Coelho' />
      </div>
      <div className='flex flex-col gap-2 p-2'>
        <SidebarButton href='/'>
          <LayoutGrid size={20} />
          Dashboard
        </SidebarButton>
        <SidebarButton href='/products'>
          <Package size={20} />
          Produtos
        </SidebarButton>
        <SidebarButton href='/sales'>
          <ShoppingBasket size={20} />
          Vendas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
