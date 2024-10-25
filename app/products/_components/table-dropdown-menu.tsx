import { AlertDialog, AlertDialogTrigger } from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import { MoreHorizontalIcon, ClipboardCopyIcon, EditIcon, TrashIcon } from 'lucide-react'
import DeleteProductDialogContent from './delete-dialog-content'
import UpsertProductDialogContent from './upsert-dialog-content'
import { useState } from 'react'
import { Product } from '@prisma/client'

interface ProductTableDropdownMenuProps {
  product: Product
}

const ProductTableDropdownMenu = ({ product }: ProductTableDropdownMenuProps) => {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false)
  return (
    <AlertDialog>
      <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='flex cursor-pointer flex-col gap-1.5 bg-white shadow-sm'>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex gap-1.5'>
              <ClipboardCopyIcon
                size={16}
                onClick={() => {
                  navigator.clipboard.writeText(product.id)
                }}
              />
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className='flex gap-1.5'>
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger>
              <DropdownMenuItem className='flex gap-1.5'>
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

export default ProductTableDropdownMenu
