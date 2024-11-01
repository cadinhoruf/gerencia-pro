'use client'
import { Combobox, ComboboxOption } from '@/app/_components/ui/combobox'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { Button } from '@/app/_components/ui/button'
import { ComboboxProductOption, ComboboxProductValue } from '@/app/_components/ui/combobox-product'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/app/_components/ui/form'
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/app/_components/ui/sheet'
import { PlusIcon, CheckIcon, LoaderCircleIcon } from 'lucide-react'
import { Input } from '@/app/_components/ui/input'
import { flattenValidationErrors } from 'next-safe-action'
import SaleUpsertSheetTable from './upsert-sheet-table'
import { upsertSale } from '@/app/_actions/sale/upsert-sale'
import { ProductDto } from '@/app/_data-access/product/get-product'
import { Client } from '@prisma/client'

const formSchema = z.object({
  productId: z.string().uuid({ message: 'O produto é obrigatório' }),
  quantity: z.coerce.number({ message: 'A quantidade é obrigatoria' }).int().positive(),
  clientId: z.string().uuid({ message: 'O cliente é obrigatório' })
})

type FormSchema = z.infer<typeof formSchema>

export interface SelectedProducts {
  id: string
  name: string
  price: number
  cost: number
  quantity: number
}

interface UpsertSheetContentProps {
  isOpen: boolean
  saleId?: string
  products: ProductDto[]
  productOptions: ComboboxProductOption[]
  clientOptions: ComboboxOption[]
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>
  defaultSelectedProducts?: SelectedProducts[]
}

const UpsertSheetContent = ({
  saleId,
  productOptions,
  products,
  clientOptions,
  defaultSelectedProducts,
  isOpen,
  setSheetIsOpen
}: UpsertSheetContentProps) => {
  const [actualProduct, setActualProduct] = useState<string>('')
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(defaultSelectedProducts ?? [])
  const { execute: executeUpsertSale } = useAction(upsertSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors)
      toast.error(serverError ?? flattenedErrors.formErrors[0])
    },
    onSuccess: () => {
      toast.success('Venda realizada com sucesso.')
      setSheetIsOpen(false)
    }
  })
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
      clientId: ''
    }
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset()
      setSelectedProducts([])
    }
  }, [form, isOpen])
  useEffect(() => {
    setSelectedProducts(defaultSelectedProducts ?? [])
  }, [defaultSelectedProducts])

  const onSubmit = async (data: FormSchema) => {
    const selectedProduct = products.find(product => product.id === data.productId)
    if (!selectedProduct) return

    setSelectedProducts(currentProducts => {
      const existingProduct = currentProducts.find(product => product.id === selectedProduct.id)
      if (existingProduct) {
        const productStock = typeof selectedProduct.stock === 'number'
        if (productStock) {
          const isOutOfStock = data.quantity > selectedProduct.stock!
          if (isOutOfStock) {
            form.setError('quantity', { message: 'Quantidade indisponível em estoque.' })
            return currentProducts
          }
          return currentProducts.map(product => {
            if (product.id === selectedProduct.id) {
              return { ...product, quantity: product.quantity + data.quantity }
            }
            return product
          })
        } else {
          return currentProducts.map(product => {
            if (product.id === selectedProduct.id) {
              return { ...product, quantity: product.quantity + data.quantity, cost: product.cost }
            }
            return product
          })
        }
      } else {
        const productStock = typeof selectedProduct.stock === 'number'
        if (productStock) {
          const isOutOfStock = selectedProduct.stock !== 0 ? data.quantity > selectedProduct.stock! : 0
          if (isOutOfStock) {
            form.setError('quantity', { message: 'Quantidade indisponível em estoque.' })
            return currentProducts
          }
        }
        return [
          ...currentProducts,
          { ...selectedProduct, quantity: data.quantity, price: Number(selectedProduct.price) }
        ]
      }
    })
    form.reset({
      ...form.getValues(),
      productId: '',
      quantity: 1
    })
  }

  const productHaveStock = products.find(product => product.id === actualProduct)?.stock

  const onSubmitSale = async () => {
    executeUpsertSale({
      id: saleId,
      products: selectedProducts.map(product => ({
        id: product.id,
        quantity: product.quantity
      })),
      clientId: form.getValues('clientId')
    })
  }

  return (
    <SheetContent className='!max-w-[700px] overflow-y-auto'>
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informações da venda abaixo</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className='space-y-6 py-6' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='clientId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <FormControl>
                  <Combobox {...field} placeholder='Selecione um cliente' options={clientOptions} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='productId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <ComboboxProductValue
                    {...field}
                    placeholder='Selecione um produto'
                    options={productOptions}
                    // setActualProduct={setActualProduct}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input {...field} type='number' placeholder='Quantidade' className='w-full' min={1} step={1} />
                </FormControl>
                {/* {actualProduct &&  (
                  <FormDescription className='text-xs'>Quantidade em estoque: {cn(productHaveStock)}</FormDescription>
                )} */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full gap-2' variant='secondary'>
            <PlusIcon size={20} />
            Adicionar produto a venda
          </Button>
        </form>
      </Form>
      <SaleUpsertSheetTable selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
      <SheetFooter className='pt-6'>
        <Button
          type='submit'
          className='w-full gap-2'
          variant='default'
          disabled={selectedProducts.length === 0}
          onClick={onSubmitSale}
        >
          {form.formState.isSubmitting ? (
            <LoaderCircleIcon size={20} className='animate-spin' />
          ) : (
            <CheckIcon size={20} />
          )}
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}

export default UpsertSheetContent
