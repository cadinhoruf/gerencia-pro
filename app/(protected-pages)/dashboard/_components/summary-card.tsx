import { cn } from '@/app/_lib/utils'
import { ReactNode } from 'react'

interface SummaryCardProps {
  children: ReactNode
  className?: string
}

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center items-center bg-emerald-500 bg-opacity-10 rounded-md rounded-mg w-9 h-9 text-emerald-500'>
      {children}
    </div>
  )
}

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return <p className='font-medium text-slate-500 text-sm'>{children}</p>
}

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className='font-semibold text-2xl text-slate-900'>{children}</p>
}

export const SummaryCard = ({ children, className }: SummaryCardProps) => {
  return <div className={cn('rounded-xl bg-white p-6', className)}>{children}</div>
}
