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
import UpsertSaleTableDropdownMenu from './upsert-table-dropdown-menu'
import { SelectedProducts } from './upsert-sheet-content'
import { Dispatch, SetStateAction, useMemo } from 'react'

interface SaleUpsertSheetTableProps {
  selectedProducts: SelectedProducts[]
  setSelectedProducts: Dispatch<SetStateAction<SelectedProducts[]>>
}

const SaleUpsertSheetTable = ({ selectedProducts, setSelectedProducts }: SaleUpsertSheetTableProps) => {
  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }, [selectedProducts])

  const onDelete = (productId: string) => {
    setSelectedProducts(currentProducts => currentProducts.filter(product => product.id !== productId))
  }
  return (
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
            <UpsertSaleTableDropdownMenu product={product} onDelete={onDelete} />
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
  )
}

export default SaleUpsertSheetTable
