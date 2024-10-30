import { AlertDialog, AlertDialogTrigger } from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { Sale } from '@prisma/client'

import { MoreHorizontalIcon, ClipboardCopyIcon, EditIcon, TrashIcon } from 'lucide-react'
import DeleteSaleDialogContent from './delete-dialog-content'
import { copyToClipboard } from '@/app/_helpers/copy-to-clipboard'

interface SaleTableDropdownMenuProps {
  sale: Pick<Sale, 'id'>
}

const SaleTableDropdownMenu = ({ sale }: SaleTableDropdownMenuProps) => {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ClipboardCopyIcon size={16} onClick={() => copyToClipboard(sale.id)} />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EditIcon size={16} />
            Editar
          </DropdownMenuItem>
          <AlertDialogTrigger>
            <DropdownMenuItem>
              <TrashIcon size={16} />
              Deletar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteSaleDialogContent saleId={sale.id} />
    </AlertDialog>
  )
}

export default SaleTableDropdownMenu
