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

const UpsertSaleTableDropdownMenu = ({ product, onDelete }: ProductTableDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex cursor-pointer flex-col gap-1.5 space-y-1 bg-white p-2 shadow-md'>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='w-full'>
          <ClipboardCopyIcon
            size={16}
            onClick={() => {
              navigator.clipboard.writeText(product.id)
            }}
          />
          Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem className='w-full' onClick={() => onDelete(product.id)}>
          <TrashIcon size={16} />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UpsertSaleTableDropdownMenu
