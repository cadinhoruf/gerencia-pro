'use client'
import { Button } from '@/app/_components/ui/button'
import { ComboboxOption } from '@/app/_components/ui/combobox'
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet'
import { Product } from '@prisma/client'
import UpsertSheetContent from './upsert-sheet-content'
import { useState } from 'react'

interface CreateSaleButtonProps {
  products: Product[]
  productOptions: ComboboxOption[]
  clientOptions: ComboboxOption[]
}

const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button>Nova venda</Button>
      </SheetTrigger>
      <UpsertSheetContent {...props} onSubmitSuccess={() => setSheetIsOpen(false)} />
    </Sheet>
  )
}

export default CreateSaleButton
