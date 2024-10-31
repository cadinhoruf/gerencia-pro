import UpsertClientButton from './_components/create-client-button'
import { clientTableColumns } from './_components/table-colums'
import { Header, HeaderLeft, HeaderSubtitle, HeaderTitle, HeaderRight } from '@/app/_components/header'
import { DataTable } from '@/app/_components/ui/data-table'
import { getClients } from '@/app/_data-access/clients/get-client'

const ClientsPage = async () => {
  const clients = await getClients()
  return (
    <>
      <div className='custom-container'>
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Gestão de clientes</HeaderSubtitle>
            <HeaderTitle>Clientes</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <UpsertClientButton />
          </HeaderRight>
        </Header>
        <DataTable columns={clientTableColumns} data={JSON.parse(JSON.stringify(clients))} />
      </div>
    </>
  )
}

export default ClientsPage
