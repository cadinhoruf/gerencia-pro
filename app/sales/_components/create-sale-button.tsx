'use client'
import { Button } from '@/app/_components/ui/button'
import { ComboboxOption } from '@/app/_components/ui/combobox'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import { Product } from '@prisma/client'
import UpsertSheetContent from './upsert-sheet-content'
import { useState } from 'react'
import { PlusIcon } from 'lucide-react'

interface CreateSaleButtonProps {
  products: Product[]
  productOptions: ComboboxOption[]
  clientOptions: ComboboxOption[]
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild className='gap-2'>
        <Button>
          <PlusIcon size={20} />
          Nova venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent {...props} isOpen={sheetIsOpen} setSheetIsOpen={setSheetIsOpen} />
    </Sheet>
  )
}

export default CreateSaleButton
