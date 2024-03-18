'use client'
import { commandIcon } from '@/app/utils/Icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Command, CommandInput } from '@/components/ui/command'
import React from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from 'cmdk'
import { CalendarIcon, FacebookIcon, RocketIcon } from 'lucide-react'

function SearchBar() {
  const { inputValue } = useGlobalContext()
  return (
    <div className='search-btn'>
      <Command className='rounded-lg border shadow-md'>
        <CommandInput placeholder='Search...' />
        <CommandList></CommandList>
      </Command>
    </div>
  )
}

export default SearchBar
