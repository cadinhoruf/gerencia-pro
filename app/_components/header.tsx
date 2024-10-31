import { cn } from '../_lib/utils'

const Header = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex w-full items-center justify-between', className)}>{children}</div>
}

const HeaderRight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('', className)}>{children}</div>
}

const HeaderLeft = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('', className)}>{children}</div>
}

const HeaderTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h2 className={cn('text-xl font-semibold', className)}>{children}</h2>
}

const HeaderSubtitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <span className={cn('text-xs font-semibold text-slate-500', className)}>{children}</span>
}

export { Header, HeaderRight, HeaderLeft, HeaderTitle, HeaderSubtitle }
