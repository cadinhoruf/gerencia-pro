import { Header, HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from '../_components/header'
import { DataTable } from '../_components/ui/data-table'
import { getProducts } from '../_data-access/product/get-product'
import AddProductButton from './_components/create-product-button'
import { productTableColumns } from './_components/table-columns'
import { Toaster } from 'react-hot-toast'

const ProductsPage = async () => {
  const products = await getProducts()
  return (
    <>
      <Toaster position='top-right' />
      <div className='custom-container'>
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Gestão de produtos</HeaderSubtitle>
            <HeaderTitle>Produtos</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <AddProductButton />
          </HeaderRight>
        </Header>
        <DataTable columns={productTableColumns} data={JSON.parse(JSON.stringify(products))} />
      </div>
    </>
  )
}

export default ProductsPage
