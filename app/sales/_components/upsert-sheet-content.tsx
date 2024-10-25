'use client'
import { Button } from '@/app/_components/ui/button'
import { Combobox, ComboboxOption } from '@/app/_components/ui/combobox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/app/_components/ui/sheet'
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
import { PlusIcon } from 'lucide-react'
import { useMemo, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({
  productId: z.string().uuid({ message: 'O produto é obrigatório' }),
  quantity: z.coerce.number({ message: 'A quantidade é obrigatoria' }).int().positive()
})

type FormSchema = z.infer<typeof formSchema>

interface UpsertSheetContentProps {
  products: Product[]
  productOptions: ComboboxOption[]
}

interface SelectedProducts {
  id: string
  name: string
  price: number
  quantity: number
}

const UpsertSheetContent = ({ productOptions, products }: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([])
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1
    }
  })
  const onSubmit = async (data: FormSchema) => {
    const selectedProduct = products.find(product => product.id === data.productId)
    if (!selectedProduct) return

    setSelectedProducts(currentProducts => {
      const existingProduct = currentProducts.find(product => product.id === selectedProduct.id)

      if (existingProduct) {
        return currentProducts.map(product => {
          if (product.id === selectedProduct.id) {
            return { ...product, quantity: product.quantity + data.quantity }
          }
          return product
        })
      }
      return [...currentProducts, { ...selectedProduct, quantity: data.quantity, price: Number(selectedProduct.price) }]
    })
  }

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }, [selectedProducts])

  return (
    <SheetContent className='!max-w-[700px]'>
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informações da venda abaixo</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form className='space-y-6 py-6' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='productId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox {...field} placeholder='Selecione um produto' options={productOptions} />
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
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell> {formatCurrency(product.price * product.quantity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  )
}

export default UpsertSheetContent
