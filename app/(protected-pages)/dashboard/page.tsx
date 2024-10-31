import { CircleDollarSignIcon, DollarSignIcon, PackageIcon, ShoppingBasketIcon } from 'lucide-react'
import { SummaryCard, SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from './_components/summary-card'
import { Header, HeaderLeft, HeaderSubtitle, HeaderTitle } from '@/app/_components/header'

export default function Home() {
  return (
    <div className='m-8 w-full space-y-8 rounded-lg px-8'>
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className='grid grid-cols-2 gap-6'>
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Total</SummaryCardTitle>
          <SummaryCardValue>R$20.000,00</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
          <SummaryCardValue>R$ 200,00</SummaryCardValue>
        </SummaryCard>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
          <SummaryCardValue>1040</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
          <SummaryCardValue>100</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em Produtos</SummaryCardTitle>
          <SummaryCardValue>200</SummaryCardValue>
        </SummaryCard>
      </div>
    </div>
  )
}
