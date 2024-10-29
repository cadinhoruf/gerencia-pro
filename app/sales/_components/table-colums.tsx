'use client'
import { SalesDto } from '@/app/_data-access/sale/get-sales'
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
    header: 'Valor Total'
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original } }) => {
      return new Date(original.date).toLocaleDateString('pt-BR')
    }
  }
]
