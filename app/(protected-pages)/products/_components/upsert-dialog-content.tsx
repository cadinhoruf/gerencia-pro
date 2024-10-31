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
import { Label } from '@/app/_components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/app/_components/ui/radio-group'
import UpsertButton from '@/app/_components/upsert-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { flattenValidationErrors } from 'next-safe-action'
import { useAction } from 'next-safe-action/hooks'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { NumericFormat } from 'react-number-format'

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProductSchema
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpsertProductDialogContent = ({ setDialogIsOpen, defaultValues }: UpsertProductDialogContentProps) => {
  const [stock, setStock] = useState(false)
  const { execute: executeUpsertProduct } = useAction(upsertProduct, {
    onSuccess: () => {
      toast.success(`Produto ${isEdditing ? 'editado' : 'criado'}   com sucesso`)
      setDialogIsOpen(false)
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors)
      toast.error(serverError ?? flattenedErrors.formErrors[0])
    }
  })
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: '',
      price: 0,
      cost: 0
    }
  })

  const isEdditing = !!defaultValues

  const onSubmit = (data: UpsertProductSchema) => {
    executeUpsertProduct({ ...data, id: defaultValues?.id })
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
            name='cost'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo</FormLabel>
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
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço de Venda</FormLabel>
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
          <div className='flex flex-col gap-2'>
            <Label>Possui estoque ?</Label>
            <RadioGroup>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='yes' id='yes' onClick={() => setStock(true)} />
                <Label htmlFor='yes'>Sim</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='no' id='no' onClick={() => setStock(false)} />
                <Label htmlFor='no'>Não</Label>
              </div>
            </RadioGroup>
          </div>
          {stock && (
            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Digite o estoque do produto'
                      {...field}
                      value={field.value != null ? field.value : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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

export default UpsertProductDialogContent
