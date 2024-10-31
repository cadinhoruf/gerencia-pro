import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../../_components/ui/alert-dialog'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { deleteSale } from '@/app/_actions/sale/delete-sale'

type DeleteSaleDialogContentProps = {
  saleId: string
}
const DeleteSaleDialogContent = ({ saleId }: DeleteSaleDialogContentProps) => {
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success('Venda deletada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao deletar a venda.')
    }
  })
  const handleDeleteSale = () => executeDeleteSale({ id: saleId })
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir esta venda. Esta ação não pode ser desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteSale}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteSaleDialogContent
