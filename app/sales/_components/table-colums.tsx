'use client'
import { SalesDto } from '@/app/_data-access/sale/get-sales'
import { formatCurrency } from '@/app/_helpers/currency'
import { ColumnDef } from '@tanstack/react-table'

export const saleTableColums: ColumnDef<SalesDto>[] = [
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
  }
]