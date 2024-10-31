import { HandshakeIcon, LayoutGrid, Package, ShoppingBasket } from 'lucide-react'
import SidebarButton from './sidebar-button'

const Sidebar = () => {
  return (
    <div className='flex h-screen w-64 flex-col bg-white'>
      <div className='flex items-center justify-center p-4'>
        <h1 className='text-2xl font-bold'>GerenciaPro</h1>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        <SidebarButton href='/dashboard'>
          <LayoutGrid size={20} /> Dashboard
        </SidebarButton>
        <SidebarButton href='/products'>
          <Package size={20} />
          Produtos
        </SidebarButton>
        <SidebarButton href='/sales'>
          <ShoppingBasket size={20} />
          Vendas
        </SidebarButton>
        <SidebarButton href='/clients'>
          <HandshakeIcon size={20} />
          Clientes
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
