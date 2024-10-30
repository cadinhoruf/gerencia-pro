import { Button } from './ui/button'
import { Loader2Icon } from 'lucide-react'

interface UpsertButtonProps {
  isEdditing: boolean
  isSubmitting: boolean
}

const UpsertButton = ({ isEdditing, isSubmitting }: UpsertButtonProps) => {
  return (
    <Button type='submit' disabled={isSubmitting} className='flex items-center justify-center gap-1.5'>
      {isEdditing ? 'Salvar' : 'Criar'}
      {isSubmitting && <Loader2Icon className='h-4 w-4 animate-spin' />}
    </Button>
  )
}

export default UpsertButton
