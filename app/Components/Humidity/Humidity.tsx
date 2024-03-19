'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { droplets } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Humidity() {
  const { forecast } = useGlobalContext()

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-3 flex items-center'>
        <p className='text-300 items-center'>Loading</p>
      </Skeleton>
    )
  }

  // Extracts the humidity value from the forecast data.
  const { humidity } = forecast?.main

  // Function to determine the descriptive text based on the humidity level.
  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return 'Dry: May cause skin irritation'
    else if (humidity >= 30 && humidity < 50)
      return 'Comfortable: Ideal for health and comfort'
    else if (humidity >= 50 && humidity < 70)
      return 'Moderate: Sticky, may increase allergens'
    else if (humidity >= 70) return 'High: Uncomfortable, mold growth risk'
    return 'Unavailable: Humidity data not available' // Fallback text.
  }

  // Renders the component with humidity information and descriptive text.
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {droplets} Humidity
        </h2>
        <p className='pt-4 text-2xl'>{humidity}%</p>
      </div>
      <p className='text-sm'>{getHumidityText(humidity)}.</p>
    </div>
  )
}

export default Humidity
