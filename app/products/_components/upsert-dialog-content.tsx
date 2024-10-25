'use client'
import { upsertProduct } from '@/app/_actions/products/upsert-product'
import { UpsertProductSchema, upsertProductSchema } from '@/app/_actions/products/upsert-product/schema'
import { Button } from '@/app/_components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/app/_components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NumericFormat } from 'react-number-format'

interface UpsertProductDialogContentProps {
  onSuccess?: () => void
  defaultValues?: UpsertProductSchema
}

const UpsertProductDialogContent = ({ onSuccess, defaultValues }: UpsertProductDialogContentProps) => {
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: '',
      price: 0,
      stock: 1
    }
  })

  const isEdditing = !!defaultValues

  const onSubmit = async (data: UpsertProductSchema) => {
    try {
      setTimeout(() => {}, 5000)
      await upsertProduct({ ...data, id: defaultValues?.id })
      onSuccess?.()
      toast.success(`Produto ${isEdditing ? 'editado' : 'criado'}  com sucesso!`)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar produto')
    }
  }
  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <DialogHeader>
            <DialogTitle>{isEdditing ? 'Editar' : 'Criar'} produto</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder='Digite o nome do produto' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator='.'
                    decimalSeparator=','
                    fixedDecimalScale
                    decimalScale={2}
                    prefix='R$'
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={values => field.onChange(values.floatValue)}
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='Digite o estoque do produto' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary' type='reset'>
                Cancelar
              </Button>
            </DialogClose>
            <Button type='submit' disabled={form.formState.isSubmitting} className='flex gap-1.5'>
              {isEdditing ? 'Salvar' : 'Criar'}
              {form.formState.isSubmitting && <CircleIcon className='mr-2 h-4 w-4 animate-spin' />}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UpsertProductDialogContent
