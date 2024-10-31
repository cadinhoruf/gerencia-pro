import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { deleteClient } from '@/app/_actions/client/delete-client'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from '@/app/_components/ui/alert-dialog'

type DeleteClientDialogContentProps = {
  clientId: string
}
const DeleteClientDialogContent = ({ clientId }: DeleteClientDialogContentProps) => {
  const { execute: executeDeleteClient } = useAction(deleteClient, {
    onError: () => {
      toast.error('Erro ao deletar o cliente.')
    },
    onSuccess: () => {
      toast.success('Cliente deletado com sucesso')
    }
  })
  const handleDeleteClient = () => executeDeleteClient({ id: clientId })
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir este cliente. Esta ação não pode ser desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteClient}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteClientDialogContent
