'use client'
import { Button } from '@/app/_components/ui/button'
import { Combobox, ComboboxOption } from '@/app/_components/ui/combobox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/app/_components/ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/_components/ui/table'
import { formatCurrency } from '@/app/_helpers/currency'
import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SalesTableDropdownMenu from './table-dropdown-menu'
import { cn } from '@/app/_lib/utils'
import { ComboboxValue } from '@/app/_components/ui/combobox-value'
import { createSale } from '@/app/_actions/sale/create-sale'
import toast from 'react-hot-toast'
import { on } from 'events'

const formSchema = z.object({
  productId: z.string().uuid({ message: 'O produto é obrigatório' }),
  quantity: z.coerce.number({ message: 'A quantidade é obrigatoria' }).int().positive(),
  clientId: z.string().uuid({ message: 'O cliente é obrigatório' })
})

type FormSchema = z.infer<typeof formSchema>

interface UpsertSheetContentProps {
  products: Product[]
  productOptions: ComboboxOption[]
  clientOptions: ComboboxOption[]
  onSubmitSuccess: () => void
}

interface SelectedProducts {
  id: string
  name: string
  price: number
  cost: number
  quantity: number
}

const UpsertSheetContent = ({ productOptions, products, clientOptions, onSubmitSuccess }: UpsertSheetContentProps) => {
  const [actualProduct, setActualProduct] = useState<string>()
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([])
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
      clientId: ''
    }
  })
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

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }, [selectedProducts])

  const onDelete = (productId: string) => {
    setSelectedProducts(currentProducts => currentProducts.filter(product => product.id !== productId))
  }

  const productStock = products.find(product => product.id === actualProduct)?.stock

  const onSubmitSale = async () => {
    try {
      await createSale({
        products: selectedProducts.map(product => ({ id: product.id, quantity: product.quantity })),
        clientId: form.getValues('clientId')
      })
      toast.success('Venda criada com sucesso!')
      setSelectedProducts([])
      onSubmitSuccess()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar venda.')
    }
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
                  <ComboboxValue
                    {...field}
                    placeholder='Selecione um produto'
                    options={productOptions}
                    setActualProduct={setActualProduct}
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
                {actualProduct && productStock && (
                  <FormDescription className='text-xs'>Quantidade em estoque: {cn(productStock)}</FormDescription>
                )}
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

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Custo Unitário</TableHead>
            <TableHead>Valor Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.cost)}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell> {formatCurrency(product.price * product.quantity)}</TableCell>
              <SalesTableDropdownMenu product={product} onDelete={onDelete} />
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className='pt-6'>
        <Button
          type='submit'
          className='w-full gap-2'
          variant='default'
          disabled={selectedProducts.length === 0}
          onClick={onSubmitSale}
        >
          <CheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}

export default UpsertSheetContent
