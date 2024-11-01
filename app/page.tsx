import Image from 'next/image'

export default async function RegisterPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white'>
      {/* Hero Section */}
      <section className='flex min-h-screen flex-col items-center justify-center px-4'>
        <div className='container mx-auto text-center'>
          <h1 className='mb-6 text-5xl font-bold text-blue-500'>GerenciaPro</h1>
          <p className='mb-8 text-xl text-gray-300'>Controle total do seu negócio em um único lugar</p>
          <div className='mb-12 flex justify-center gap-4'>
            <button className='rounded-full bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700'>
              Começar Agora
            </button>
            <button className='rounded-full border border-white px-8 py-3 font-semibold hover:bg-white/10'>
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='mb-12 text-center text-3xl font-bold'>Recursos Principais</h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-4 text-xl font-semibold text-blue-400'>Controle de Estoque</h3>
              <p className='text-gray-300'>Gerencie seu inventário em tempo real com atualizações automáticas</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-4 text-xl font-semibold text-blue-400'>Gestão de Vendas</h3>
              <p className='text-gray-300'>Acompanhe suas vendas e gere relatórios detalhados</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-6'>
              <h3 className='mb-4 text-xl font-semibold text-blue-400'>Cadastro de Produtos</h3>
              <p className='text-gray-300'>Organize seus produtos com categorias e informações completas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-blue-600 py-20'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='mb-6 text-3xl font-bold'>Comece a usar o GerenciaPro hoje mesmo</h2>
          <p className='mb-8 text-lg'>7 dias grátis. Sem compromisso.</p>
          <button className='rounded-full bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100'>
            Criar Conta Grátis
          </button>
        </div>
      </section>
    </main>
  )
}
