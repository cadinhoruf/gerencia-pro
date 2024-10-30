'use client'
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
import DeleteSalesDialogContent from './delete-dialog-content'
import { copyToClipboard } from '@/app/_helpers/copy-to-clipboard'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import UpsertSheetContent from './upsert-sheet-content'
import { useState } from 'react'

interface SalesTableDropdownMenuProps {
  sale: Pick<Sale, 'id'>
}

const SalesTableDropdownMenu = ({ sale }: SalesTableDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false)
  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
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
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger>
              <DropdownMenuItem>
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteSalesDialogContent saleId={sale.id} />
      </AlertDialog>

      <UpsertSheetContent
        isOpen={upsertSheetIsOpen}
        clientOptions={[]}
        productOptions={[]}
        products={[]}
        setSheetIsOpen={setUpsertSheetIsOpen}
      />
    </Sheet>
  )
}

export default SalesTableDropdownMenu
