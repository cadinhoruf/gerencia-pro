import { Toaster } from 'react-hot-toast'
import UpsertClientButton from './_components/create-client-button'
import { getClients } from '../_data-access/clients/get-client'
import { DataTable } from '../_components/ui/data-table'
import { clientTableColumns } from './_components/table-colums'
import { Header, HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from '../_components/header'

const ClientsPage = async () => {
  const clients = await getClients()
  return (
    <>
      <Toaster position='top-right' />
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
