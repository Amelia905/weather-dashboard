// Indicate that this component should only be used on the client-side in Next.js applications.
'use client'
// Import necessary hooks and utilities.
import { useGlobalContext } from '@/app/context/globalContext'
import { thermo } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import React, { use } from 'react'
import { airQualityIndexText } from '@/app/utils/misc'

// Define the AirPollution component.
function AirPollution() {
  // Access airQuality data from the global context.
  const { airQuality } = useGlobalContext()

  // Display a loading skeleton if air quality data is not available or incomplete.
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-3 flex items-center justify-center'>
        <p className='text-300 items-center'>Loading</p>
      </Skeleton>
    )
  }

  // Calculate the air quality index.
  const airQualityIndex = airQuality.list[0].main.aqi * 10

  // Find the corresponding air quality description based on the air quality index.
  const filteredIndex = airQualityIndexText.find((item) => {
    return item.rating === airQualityIndex
  })

  // Render the component with air quality information.
  return (
    <div
      className='air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'
      data-testid='air-pollution-container'
    >
      <h2 className='flex items-center gap-2 font-medium'>
        {thermo}Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className='progress' />
      <p>Air quality is {filteredIndex?.description}</p>
    </div>
  )
}

// Export the component for use in other parts of the application.
export default AirPollution
