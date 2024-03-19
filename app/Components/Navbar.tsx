'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { github } from '../utils/Icons'
import SearchBar from './SearchBar/SearchBar'
import { useGlobalContext } from '../context/globalContext'

function Navbar() {
  // Hook for programmatic navigation within the app.
  const router = useRouter()

  // Renders the Navbar component.
  return (
    <div className='w-full py-4 flex items-center justify-between'>
      <div className='left'></div>
      <div className='search-container flex shrink-0 w-full gap-2 sm:w-fit'>
        <SearchBar />

        <div className='btn-group flex items-center gap-2'>
          <Button
            className='source-code-btn flex items-center gap-2'
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open(
                  'https://github.com/Amelia905/weather-dashboard',
                  '_blank'
                )
              }
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
