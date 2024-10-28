import { Toaster } from 'react-hot-toast'
import AddClientButton from './_components/create-client-button'
import { getClients } from '../_data-access/clients/get-client'
import { DataTable } from '../_components/ui/data-table'
import { clientTableColumns } from './_components/table-colums'

const ClientsPage = async () => {
  const clients = await getClients()
  return (
    <>
      <Toaster position='top-right' />
      <div className='m-8 w-full space-y-8 rounded-lg bg-white p-8'>
        <div className='flex w-full items-center justify-between'>
          <div className='space-y-1'>
            <span className='text-xs font-semibold text-slate-500'>Gestão de Clientes</span>
            <h2 className='text-xl font-semibold'>Clientes</h2>
          </div>
          <AddClientButton />
        </div>
        <DataTable columns={clientTableColumns} data={JSON.parse(JSON.stringify(clients))} />
      </div>
    </>
  )
}

export default ClientsPage
