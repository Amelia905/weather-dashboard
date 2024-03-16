'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { thermometer } from '@/app/utils/Icons'
import { kelvinToCelsius } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function FeelsLike() {
  const { forecast } = useGlobalContext()

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const { feels_like, temp_min, temp_max } = forecast?.main

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

  const feelsLikeDesc = feelsLikeText(feels_like, temp_min, temp_max)
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