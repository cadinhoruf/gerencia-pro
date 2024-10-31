import { HandshakeIcon, LayoutGrid, Package, ShoppingBasket } from 'lucide-react'
import SidebarButton from './sidebar-button'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-white w-64 h-screen'>
      <div className='flex justify-center items-center p-4'>
        <h1 className='font-bold text-2xl'>GerenciaPro</h1>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        <SidebarButton href='/'>
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
