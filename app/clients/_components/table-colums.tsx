'use client'
import ClientStatusBadge from '@/app/_components/sale-status-badge'
import { Client } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
// import ProductTableDropdownMenu from './table-dropdown-menu'

export const clientTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Nome do cliente'
  },
  {
    accessorKey: 'contactName',
    header: 'Pessoa de contato'
  },
  {
    accessorKey: 'contactNumber',
    header: 'Telefone'
  },
  {
    accessorKey: 'cnpj',
    header: 'CNPJ'
  },
  {
    accessorKey: 'cpf',
    header: 'CPF'
  },
  {
    accessorKey: 'address',
    header: 'Endereço'
  },
  {
    header: 'Ações',
    accessorKey: 'actions',
    cell: row => {
      const product = row.row.original
      // return <ProductTableDropdownMenu product={product} />
    }
  }
]
