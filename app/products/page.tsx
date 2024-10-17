import { DataTable } from '../_components/ui/data-table'
import { getProducts } from '../_data-access/product/get-product'
import AddProductButton from './_components/create-product-button'
import { productTableColumns } from './_components/table-columns'
import { Toaster } from 'react-hot-toast'

const ProductsPage = async () => {
  const products = await getProducts()
  return (
    <>
      <Toaster />
      <div className='m-8 w-full space-y-8 rounded-lg bg-white p-8'>
        <div className='flex w-full items-center justify-between'>
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-slate-500'>Gestão de Produtos</span>
            <h2 className='text-xl font-semibold'>Produtos</h2>
          </div>
          <AddProductButton />
        </div>
        <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} />
      </div>
    </>
  )
}

export default ProductsPage
