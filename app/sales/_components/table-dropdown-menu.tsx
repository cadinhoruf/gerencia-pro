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
import { MoreHorizontalIcon, ClipboardCopyIcon, EditIcon, TrashIcon } from 'lucide-react'
import DeleteSaleDialogContent from './delete-dialog-content'
import { copyToClipboard } from '@/app/_helpers/copy-to-clipboard'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import UpsertSheetContent from './upsert-sheet-content'
import { useState } from 'react'
import { ComboboxOption } from '@/app/_components/ui/combobox'
import { SaleDto } from '@/app/_data-access/sale/get-sales'
import { ProductDto } from '@/app/_data-access/product/get-product'
import { ComboboxProductOption } from '@/app/_components/ui/combobox-product'

interface SaleTableDropdownMenuProps {
  sale: Pick<SaleDto, 'id' | 'saleProducts'>
  productOptions: ComboboxProductOption[]
  products: ProductDto[]
  clientOptions: ComboboxOption[]
}

const SaleTableDropdownMenu = ({ sale, productOptions, products, clientOptions }: SaleTableDropdownMenuProps) => {
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
        <DeleteSaleDialogContent saleId={sale.id} />
      </AlertDialog>

      <UpsertSheetContent
        saleId={sale.id}
        isOpen={upsertSheetIsOpen}
        clientOptions={clientOptions}
        productOptions={productOptions}
        products={products}
        setSheetIsOpen={setUpsertSheetIsOpen}
        defaultSelectedProducts={sale.saleProducts.map(saleProduct => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
          cost: saleProduct.unitCost
        }))}
      />
    </Sheet>
  )
}

export default SaleTableDropdownMenu
