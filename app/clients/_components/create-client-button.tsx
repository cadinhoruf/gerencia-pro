'use client'
import { Button } from '@/app/_components/ui/button'
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import UpsertClientDialogContent from './upsert-dialog-content'

const AddClientButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <PlusIcon size={20} />
          Novo cliente
        </Button>
      </DialogTrigger>
      <UpsertClientDialogContent onSuccess={() => setDialogIsOpen(false)} />
    </Dialog>
  )
}

export default AddClientButton
