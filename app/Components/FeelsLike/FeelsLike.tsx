'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { thermometer } from '@/app/utils/Icons'
import { kelvinToCelsius } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function FeelsLike() {
  const { forecast } = useGlobalContext()

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-3 flex items-center justify-center'>
        <p className='text-300 items-center'>Loading</p>
      </Skeleton>
    )
  }

  // Destructure temperature details from the forecast data.
  const { feels_like, temp_min, temp_max } = forecast?.main

  // Calculates descriptive text based on the feels like temperature compared to the actual temperature range.
  const feelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2

    if (feelsLike < avgTemp - 5) {
      return 'Feels significantly colder than actual temperature'
    } else if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return 'Feels close to the actual temperature'
    } else if (feelsLike > avgTemp + 5) {
      return 'Feels significantly warmer than actual temperature.'
    }

    return 'Temperature feeling is typical for this range.'
  }

  // Generates descriptive text for the current feels like temperature.
  const feelsLikeDesc = feelsLikeText(feels_like, temp_min, temp_max)

  // Renders the component displaying the feels like temperature and descriptive text.
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>
          {thermometer} Feels Like
        </h2>
        <p className='pt-4 text-2xl'>{kelvinToCelsius(feels_like)}°</p>
      </div>
      <p className='text-sm'>{feelsLikeDesc}°</p>
    </div>
  )
}

export default FeelsLike
