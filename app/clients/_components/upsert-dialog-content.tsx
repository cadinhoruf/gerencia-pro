'use client'
import { UpsertClientSchema, upsertClientSchema } from '@/app/_actions/client/upsert-client/schema'
import { upsertProduct } from '@/app/_actions/products/upsert-product'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { withMask } from 'use-mask-input'

interface UpsertClientDialogContentProps {
  onSuccess?: () => void
  defaultValues?: UpsertClientSchema
}

const UpsertClientDialogContent = ({ onSuccess, defaultValues }: UpsertClientDialogContentProps) => {
  const [stock, setStock] = useState(false)
  const form = useForm<UpsertClientSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertClientSchema),
    defaultValues: defaultValues ?? {
      name: '',
      contactName: '',
      contactNumber: ''
    }
  })

  const isEdditing = !!defaultValues

  const onSubmit = async (data: UpsertClientSchema) => {
    try {
      setTimeout(() => {}, 5000)
      onSuccess?.()
      toast.success(`Cliente ${isEdditing ? 'editado' : 'criado'}  com sucesso!`)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar cliente')
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
                <FormLabel>Razão Social</FormLabel>
                <FormControl>
                  <Input placeholder='Digite a razão social do cliente' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contactName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pessoa de contato</FormLabel>
                <FormControl>
                  <Input placeholder='Digite o nome da pessoa de contato' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contactNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de contato</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Digite o telefone de contato'
                    {...field}
                    type='tel'
                    ref={withMask('(99) 99999-9999')}
                  />
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

export default UpsertClientDialogContent
