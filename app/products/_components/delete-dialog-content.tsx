import { deleteProduct } from '@/app/_actions/products/delete-product'
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

type DeleteProductDialogContentProps = {
  productId: string
}
export const DeleteDialogContentProduct = ({ productId }: DeleteProductDialogContentProps) => {
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct({ id: productId })
      toast.success('Produto excluído com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao excluir o produto')
    }
  }
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
