import { deleteProduct } from '@/app/_actions/products/delete-product'
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

type DeleteProductDialogContentProps = {
  productId: string
}
const DeleteProductDialogContent = ({ productId }: DeleteProductDialogContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onError: () => {
      toast.error('Erro ao deletar o produto.')
    },
    onSuccess: () => {
      toast.success('Produto deletado com sucesso')
    }
  })
  const handleDeleteProduct = () => executeDeleteProduct({ id: productId })
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza ?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir este produto. Esta acção não pode ser desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteProduct}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteProductDialogContent
