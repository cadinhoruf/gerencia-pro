'use client'
import { AlertDialog, AlertDialogTrigger } from '@/app/_components/ui/alert-dialog'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { cn } from '@/app/_lib/utils'
import { Product } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import DeleteProductDialogContent from './delete-dialog-content'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import UpsertProductDialogContent from './upsert-dialog-content'
import { useState } from 'react'

const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'Em estoque'
  }
  return 'Fora de estoque'
}

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Produto'
  },
  {
    accessorKey: 'price',
    header: 'Valor unitário',
    cell: row => {
      const product = row.row.original
      return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))
    }
  },
  {
    accessorKey: 'stock',
    header: 'Estoque'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: row => {
      const product = row.row.original
      const label = getStatusLabel(product.status)
      return (
        <Badge variant={label === 'Em estoque' ? 'secondary' : 'default'} className='gap-1.5'>
          <CircleIcon
            size={12}
            className={cn(label === 'Em estoque' ? 'fill-primary-foreground' : 'fill-popover-foreground')}
          />
          {label}
        </Badge>
      )
    }
  },
  {
    header: 'Ações',
    accessorKey: 'actions',
    cell: row => {
      const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
      const product = row.row.original
      return (
        <AlertDialog>
          <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='gap-1.5'>
                  <ClipboardCopyIcon size={16} onClick={() => navigator.clipboard.writeText(product.id)} />
                  Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className='gap-1.5'>
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger>
                  <DropdownMenuItem className='gap-1.5'>
                    <TrashIcon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent
              defaultValues={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock
              }}
              onSuccess={() => setEditDialogIsOpen(false)}
            />
            <DeleteProductDialogContent productId={product.id} />
          </Dialog>
        </AlertDialog>
      )
    }
  }
]
