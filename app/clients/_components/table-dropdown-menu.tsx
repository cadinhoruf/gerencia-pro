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
import UpsertClientDialogContent from './upsert-dialog-content'
import { Client } from '@prisma/client'
import DeleteClientDialogContent from './delete-dialog-content'

interface ClientTableDropdownMenuProps {
  client: Client
}

const ClientTableDropdownMenu = ({ client }: ClientTableDropdownMenuProps) => {
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
            <DropdownMenuItem className='w-full' onClick={() => navigator.clipboard.writeText(client.id)}>
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
        <UpsertClientDialogContent
          defaultValues={{
            id: client.id,
            name: client.name,
            address: client.address,
            contactName: client.contactName,
            contactNumber: client.contactNumber,
            cnpj: client.cnpj ?? '',
            cpf: client.cpf ?? ''
          }}
          setDialogIsOpen={setEditDialogIsOpen}
        />
        <DeleteClientDialogContent clientId={client.id} />
      </Dialog>
    </AlertDialog>
  )
}

export default ClientTableDropdownMenu
