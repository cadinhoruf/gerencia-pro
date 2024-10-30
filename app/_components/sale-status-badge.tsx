import { SaleStatusDto } from '../_data-access/sale/get-sales'
import { Badge } from './ui/badge'

const getStatusLabel = (status: SaleStatusDto): string => {
  switch (status) {
    case 'UNDER_REVIEW':
      return 'Em análise'
    case 'AWAITING_PURCHASE':
      return 'Pendente de compra'
    case 'AWAITING_PAYMENT':
      return 'Pendente pagamento'
    case 'COMPLETED':
      return 'Concluído'
    default:
      return 'Status desconhecido'
  }
}

const SaleStatusBadge = ({ status }: any) => {
  const label = getStatusLabel(status)
  return (
    <Badge variant={label === 'Em estoque' ? 'default' : 'outline'} className='gap-1.5'>
      {label}
    </Badge>
  )
}

export default SaleStatusBadge
