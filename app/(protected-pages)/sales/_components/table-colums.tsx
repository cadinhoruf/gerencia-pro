'use client'
import { formatCurrency } from '@/app/_helpers/currency'
import { ColumnDef } from '@tanstack/react-table'
import SaleStatusBadge from '@/app/_components/sale-status-badge'
import { SaleDto } from '@/app/_data-access/sale/get-sales'
import SaleTableDropdownMenu from './table-dropdown-menu'
import { ProductDto } from '@/app/_data-access/product/get-product'
import { ComboboxOption } from '@/app/_components/ui/combobox'
import { ComboboxProductOption } from '@/app/_components/ui/combobox-product'
import { Client } from '@prisma/client'

interface SaleTableColumn extends SaleDto {
  products: ProductDto[]
  productOptions: ComboboxProductOption[]
  clients: Client[]
  clientOptions: ComboboxOption[]
}

export const saleTableColums: ColumnDef<SaleTableColumn>[] = [
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
    header: 'Cliente',
    cell: ({ row: { original: sale } }) => {
      return sale.clientName
    }
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
      return (
        <SaleTableDropdownMenu
          sale={sale}
          products={sale.products}
          productOptions={sale.productOptions}
          clientOptions={sale.clientOptions}
        />
      )
    }
  }
]
