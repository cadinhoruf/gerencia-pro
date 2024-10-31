'use client'
import { upsertClient } from '@/app/_actions/client/upsert-client'
import { UpsertClientSchema, upsertClientSchema } from '@/app/_actions/client/upsert-client/schema'
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
import UpsertButton from '@/app/_components/upsert-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { flattenValidationErrors } from 'next-safe-action'
import { useAction } from 'next-safe-action/hooks'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { withMask } from 'use-mask-input'

interface UpsertClientDialogContentProps {
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>
  defaultValues?: UpsertClientSchema
}

const UpsertClientDialogContent = ({ setDialogIsOpen, defaultValues }: UpsertClientDialogContentProps) => {
  const { execute: executeUpsertClient } = useAction(upsertClient, {
    onSuccess: () => {
      toast.success(`Cliente ${isEdditing ? 'editado' : 'criado'} com sucesso`)
      setDialogIsOpen(false)
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors)
      toast.error(serverError ?? flattenedErrors.formErrors[0])
    }
  })

  const isEdditing = !!defaultValues

  const form = useForm<UpsertClientSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertClientSchema),
    defaultValues: defaultValues ?? {
      name: '',
      contactName: '',
      contactNumber: '',
      cpf: '',
      cnpj: '',
      address: ''
    }
  })

  const onSubmit = (data: UpsertClientSchema) => {
    executeUpsertClient({ ...data, id: defaultValues?.id })
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <DialogHeader>
            <DialogTitle>{isEdditing ? 'Editar' : 'Criar'} cliente</DialogTitle>
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
          <FormField
            control={form.control}
            name='cpf'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder='Digite o cpf da pessoa de contato' {...field} ref={withMask('999.999.999-99')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='cnpj'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder='Digite o cnpj da empresa' {...field} ref={withMask('99.999.999/9999-99')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder='Digite o endereço da empresa' {...field} />
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
            <UpsertButton isEdditing={isEdditing} isSubmitting={form.formState.isSubmitting} />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UpsertClientDialogContent
