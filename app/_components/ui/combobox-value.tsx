'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from './button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '@/app/_lib/utils'
import { Dispatch, SetStateAction } from 'react'

export interface ComboboxOption {
  value: string
  label: string
  cost?: number
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  setActualProduct?: Dispatch<SetStateAction<string | undefined>>
}

export const ComboboxValue = ({ value, options, placeholder, onChange, setActualProduct }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between'>
          {value
            ? options.find(option => option.value === value)?.label +
              ' - R$' +
              options.find(option => option.value === value)?.cost
            : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[250px] p-0'>
        <Command>
          <CommandInput placeholder='Busque por opções...' />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={currentValue => {
                    onChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                    setActualProduct?.(option.value)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  {option.label + ' - R$' + option.cost}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
