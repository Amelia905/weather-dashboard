'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { gauge } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

// Component to display atmospheric pressure information.
function Pressure() {
  const { forecast } = useGlobalContext()

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const { pressure } = forecast?.main

  // Function to categorize pressure levels into human-readable descriptions.
  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return 'Very low pressure'
    else if (pressure >= 1000 && pressure < 1015) return 'Low pressure'
    else if (pressure >= 1015 && pressure < 1025) return 'Normal pressure'
    else if (pressure >= 1025 && pressure < 1040) return 'High pressure'
    else if (pressure >= 1040) return 'Very high pressure'

    return 'Unavailable pressure data'
  }

  // Renders the pressure component with descriptive text based on the current pressure level.
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {gauge} Pressure
        </h2>
        <p className='pt-4 text-2xl'>{pressure} hPa</p>
      </div>

      <p className='text-sm'>{getPressureDescription(pressure)}.</p>
    </div>
  )
}

export default Pressure
