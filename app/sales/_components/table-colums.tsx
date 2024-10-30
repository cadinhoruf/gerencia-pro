'use client'
import { formatCurrency } from '@/app/_helpers/currency'
import { ColumnDef } from '@tanstack/react-table'
import SaleTableDropdownMenu from './table-dropdown-menu'
import SaleStatusBadge from '@/app/_components/sale-status-badge'
import { SaleDto } from '@/app/_data-access/sale/get-sales'

export const saleTableColums: ColumnDef<SaleDto>[] = [
  {
    accessorKey: 'productNames',
    header: 'Produtos'
  },
  {
    accessorKey: 'totalProducts',
    header: 'Quantidade de Produtos'
  },
  {
    accessorKey: 'totalAmount',
    header: 'Valor Total',
    cell: ({ row: { original } }) => {
      return formatCurrency(original.totalAmount)
    }
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original } }) => {
      return new Date(original.date).toLocaleDateString('pt-BR')
    }
  },
  {
    accessorKey: 'clientName',
    header: 'Cliente'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row: { original: sale } }) => {
      return <SaleStatusBadge status={sale.status} />
    }
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: sale } }) => {
      return <SaleTableDropdownMenu sale={sale} />
    }
  }
]
