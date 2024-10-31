import { Header, HeaderLeft, HeaderSubtitle, HeaderTitle, HeaderRight } from '@/app/_components/header'
import { DataTable } from '@/app/_components/ui/data-table'
import { getProducts } from '@/app/_data-access/product/get-product'
import AddProductButton from './_components/create-product-button'
import { productTableColumns } from './_components/table-columns'

const ProductsPage = async () => {
  const products = await getProducts()
  return (
    <>
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
