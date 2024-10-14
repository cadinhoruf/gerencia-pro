import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className='flex flex-col items-center bg-white w-64 h-screen'>
      <div className='p-4'>
        <Image width={50} height={50} src='/logo.avif' alt='Logo Toca do Coelho' />
      </div>
      <div className='flex flex-col gap-2 p-2'></div>
      <button className='px-6 py-3'>Dashboard</button>
      <button className='px-6 py-3'>Produtos</button>
      <button className='px-6 py-3'>Vendas</button>
    </div>
  )
}

export default Sidebar
