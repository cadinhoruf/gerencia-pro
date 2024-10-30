'use client'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import UpsertClientDialogContent from './upsert-dialog-content'

const UpsertClientButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <PlusIcon size={20} />
          Novo cliente
        </Button>
      </DialogTrigger>
      <UpsertClientDialogContent setDialogIsOpen={setDialogIsOpen} />
    </Dialog>
  )
}

export default UpsertClientButton
