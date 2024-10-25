import { AlertDialogTrigger } from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import { Product } from '@prisma/client'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import { MoreHorizontalIcon, ClipboardCopyIcon, TrashIcon } from 'lucide-react'

interface ProductTableDropdownMenuProps {
  product: Pick<Product, 'id'>
  onDelete: (productId: string) => void
}

const SalesTableDropdownMenu = ({ product, onDelete }: ProductTableDropdownMenuProps) => {
  return (
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

        <DropdownMenuItem className='flex gap-1.5' onClick={() => onDelete(product.id)}>
          <TrashIcon size={16} />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SalesTableDropdownMenu
