import { Toaster } from 'react-hot-toast'
import { Button } from '../_components/ui/button'
import { Sheet, SheetTrigger } from '../_components/ui/sheet'
import UpsertSheetContent from './_components/upsert-sheet-content'
import { getProducts } from '../_data-access/product/get-product'
import { ComboboxOption } from '../_components/ui/combobox'

const SalesPage = async () => {
  const products = await getProducts()
  const productOptions: ComboboxOption[] = products.map(product => ({
    value: product.id,
    label: product.name
  }))
  return (
    <>
      <Toaster position='top-right' />
      <div className='m-8 w-full space-y-8 rounded-lg bg-white p-8'>
        <div className='flex w-full items-center justify-between'>
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-slate-500'>Gestão de Vendas</span>
            <h2 className='text-xl font-semibold'>Vendas</h2>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Nova venda</Button>
            </SheetTrigger>
            <UpsertSheetContent products={JSON.parse(JSON.stringify(products))} productOptions={productOptions} />
          </Sheet>
        </div>
        {/* <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} /> */}
      </div>
    </>
  )
}

export default SalesPage
