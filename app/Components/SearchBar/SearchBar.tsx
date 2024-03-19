'use client'

import { Command, CommandInput } from '@/components/ui/command'
import React, { useState } from 'react'
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from '@/app/context/globalContext'
import { CommandEmpty, CommandList } from 'cmdk'

function SearchBar() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext()

  // update the state when we get the input value
  const { setActiveCityCoords } = useGlobalContextUpdate()

  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0)

  // get the clicked coordinates value
  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon])
  }

  const [isInputFocused, setIsInputFocused] = useState(false)

  const closeSuggestions = () => {
    // Delay hiding the suggestion list by wrapping it in a setTimeout.
    // This delay ensures that the click event on the suggestions can be processed.
    setTimeout(() => {
      setIsInputFocused(false)
    }, 400) // 100ms delay should be sufficient, but you can adjust the timing as necessary
  }

  return (
    <div className='search-btn'>
      <Command className='rounded-lg border shadow-md'>
        <CommandInput
          placeholder='Search...'
          value={inputValue}
          onChangeCapture={handleInput}
          onFocus={() => setIsInputFocused(true)}
          onBlur={closeSuggestions}
        />
        {isInputFocused && (
          <CommandList className='search-list rounded-lg border'>
            {geoCodedList.length > 0 ? (
              geoCodedList.map(
                (
                  item: {
                    name: string
                    country: string
                    state: string
                    lat: number
                    lon: number
                  },
                  index: number
                ) => {
                  const { country, state, name } = item
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`py-3 px-2 text-sm rounded-sm cursor-pointer ${
                        hoveredIndex === index ? 'bg-accent' : ''
                      }`}
                      onClick={() => {
                        getClickedCoords(item.lat, item.lon)
                      }}
                    >
                      <p className='text'>
                        {name}, {state && `${state}, `}
                        {country}
                      </p>
                    </li>
                  )
                }
              )
            ) : (
              // Show this when there are no search results
              <CommandEmpty>
                <p className='p-2 text-sm text-muted-foreground'>
                  No results found.
                </p>
              </CommandEmpty>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  )
}

export default SearchBar
function setIsInputFocused(arg0: boolean) {
  throw new Error('Function not implemented.')
}
