'use client'

import { Command, CommandInput } from '@/components/ui/command'
import React, { useState } from 'react'
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from '@/app/context/globalContext'
import { CommandList } from 'cmdk'

function SearchBar() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext()

  // update the state when we get the input value
  const { setActiveCityCoords } = useGlobalContextUpdate()

  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0)

  // get the clicked coordinates value
  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon])
  }

  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className='search-btn'>
      <Command className='rounded-lg border shadow-md'>
        <CommandInput
          placeholder='Search...'
          value={inputValue}
          onChangeCapture={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && (
          <ul className='search-list px-3 pb-2'>
            <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>

            {geoCodedList?.length === 0 || (!geoCodedList && <p>No Results</p>)}

            {geoCodedList &&
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
                      className={`py-3 px-2 text-sm  rounded-sm cursor-default
                          ${hoveredIndex === index ? 'bg-accent' : ''}
                        `}
                      onClick={() => {
                        getClickedCoords(item.lat, item.lon)
                      }}
                    >
                      <p className=' text'>
                        {name}, {state && state + ','} {country}
                      </p>
                    </li>
                  )
                }
              )}
          </ul>
        )}
        <CommandList></CommandList>
      </Command>
    </div>
  )
}

export default SearchBar
