import { AlertDialog, AlertDialogTrigger } from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { MoreHorizontalIcon, ClipboardCopyIcon, EditIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import DeleteProductDialogContent from './delete-dialog-content'
import UpsertProductDialogContent from './upsert-dialog-content'
import { ProductDto } from '@/app/_data-access/product/get-product'

interface ProductTableDropdownMenuProps {
  product: ProductDto
}

const ProductTableDropdownMenu = ({ product }: ProductTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogIsOpen] = useState(false)
  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='w-full' onClick={() => navigator.clipboard.writeText(product.id)}>
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className='w-full'>
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className='w-full'>
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
            stock: product.stock,
            cost: Number(product.cost),
            createdByUserId: product.createdByUserId,
            updatedByUserId: product.updatedByUserId
          }}
          setDialogIsOpen={setEditDialogIsOpen}
        />
        <DeleteProductDialogContent productId={product.id} />
      </Dialog>
    </AlertDialog>
  )
}

export default ProductTableDropdownMenu
