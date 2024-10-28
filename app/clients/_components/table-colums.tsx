'use client'
import { Product } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
// import ProductTableDropdownMenu from './table-dropdown-menu'

export const clientTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Nome do cliente'
  },
  {
    accessorKey: 'cost',
    header: 'Custo unitário',
    cell: row => {
      const product = row.row.original
      return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.cost))
    }
  },
  {
    accessorKey: 'price',
    header: 'Valor unitário',
    cell: row => {
      const product = row.row.original
      return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))
    }
  }

  // {
  //   header: 'Ações',
  //   accessorKey: 'actions',
  //   cell: row => {
  //     const product = row.row.original
  //     return <ProductTableDropdownMenu product={product} />
  //   }
  // }
]
