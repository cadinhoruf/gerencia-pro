import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../_components/ui/alert-dialog'
import toast from 'react-hot-toast'
import { useAction } from 'next-safe-action/hooks'
import { deleteClient } from '@/app/_actions/client/delete-client'

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
