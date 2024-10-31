import { getProducts } from '../../_data-access/product/get-product'
import { ComboboxOption } from '../../_components/ui/combobox'
import { getClients } from '../../_data-access/clients/get-client'
import CreateSaleButton from './_components/create-sale-button'
import { DataTable } from '../../_components/ui/data-table'
import { saleTableColums } from './_components/table-colums'
import { getSales } from '../../_data-access/sale/get-sales'
import { ComboboxProductOption } from '../../_components/ui/combobox-product'
import { Header, HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from '../../_components/header'

const SalesPage = async () => {
  const products = await getProducts()
  const productOptions: ComboboxProductOption[] = products.map(product => ({
    value: product.id,
    cost: product.cost,
    label: product.name
  }))
  const clients = await getClients()
  const clientOptions: ComboboxOption[] = clients.map(client => ({
    value: client.id,
    label: client.name
  }))

  const sales = await getSales()

  const tableData = sales.map(sale => ({
    ...sale,
    products,
    productOptions,
    clients,
    clientOptions
  }))
  return (
    <>
      <div className='custom-container'>
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Gestão de vendas</HeaderSubtitle>
            <HeaderTitle>Vendas</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <CreateSaleButton clientOptions={clientOptions} productOptions={productOptions} products={products} />
          </HeaderRight>
        </Header>
        <DataTable columns={saleTableColums} data={tableData} />
      </div>
    </>
  )
}

export default SalesPage
