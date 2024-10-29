import { Toaster } from 'react-hot-toast'
import { getProducts } from '../_data-access/product/get-product'
import { ComboboxOption } from '../_components/ui/combobox'
import { getClients } from '../_data-access/clients/get-client'
import CreateSaleButton from './_components/create-sale-button'

const SalesPage = async () => {
  const products = await getProducts()
  const productOptions: ComboboxOption[] = products.map(product => ({
    value: product.id,
    cost: product.cost,
    label: product.name
  }))
  const clients = await getClients()
  const clientOptions: ComboboxOption[] = clients.map(client => ({
    value: client.id,
    label: client.name
  }))
  return (
    <>
      <Toaster position='top-right' />
      <div className='m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8'>
        <div className='flex w-full items-center justify-between'>
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-slate-500'>Gestão de Vendas</span>
            <h2 className='text-xl font-semibold'>Vendas</h2>
          </div>
          <CreateSaleButton
            clientOptions={clientOptions}
            productOptions={productOptions}
            products={JSON.parse(JSON.stringify(products))}
          />
        </div>
      </div>
    </>
  )
}

export default SalesPage
