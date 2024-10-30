'use client'
import { ColumnDef } from '@tanstack/react-table'
import ProductTableDropdownMenu from './table-dropdown-menu'
import { ProductDto } from '@/app/_data-access/product/get-product'
import { formatCurrency } from '@/app/_helpers/currency'
import ProductStatusBadge from '@/app/_components/product-status-badge'

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: 'name',
    header: 'Produto'
  },
  {
    accessorKey: 'cost',
    header: 'Custo unitário',
    cell: row => {
      const product = row.row.original
      return formatCurrency(product.cost)
    }
  },
  {
    accessorKey: 'price',
    header: 'Valor unitário',
    cell: ({ row: { original } }) => {
      const product = original
      return formatCurrency(Number(product.price))
    }
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
    cell: ({ row: { original } }) => {
      const product = original
      return product?.stock !== null ? product.stock : 'Produto externo'
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row: { original: product } }) => {
      return <ProductStatusBadge status={product.status} />
    }
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: row => <ProductTableDropdownMenu product={row.row.original} />
  }
]
