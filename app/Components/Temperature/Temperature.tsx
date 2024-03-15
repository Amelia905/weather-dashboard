'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from '@/app/utils/Icons'
import { kelvinToCelsius } from '@/app/utils/misc'
import moment from 'moment'

function Temperature() {
  // State
  const [localTime, setLocalTime] = useState<string>('')
  const [currentDay, setCurrentDay] = useState<string>('')

  const { forecast } = useGlobalContext()

  // Ensure forecast has the necessary data before destructuring
  const { main, timezone, name, weather } = forecast || {}

  useEffect(() => {
    if (timezone) {
      // Update time every second
      const interval = setInterval(() => {
        const localMoment = moment().utcOffset(timezone / 60)
        // Custom format: 24 hour format
        const formattedTime = localMoment.format('HH:mm:ss')
        // Day of the week
        const day = localMoment.format('dddd')

        setLocalTime(formattedTime)
        setCurrentDay(day)
      }, 1000)

      // Clear interval on component unmount
      return () => clearInterval(interval)
    }
  }, [timezone])

  // If forecast or weather is not present, show loading
  if (!forecast || !weather) {
    return <div>Loading...</div>
  }

  const temp = kelvinToCelsius(main?.temp)
  const minTemp = kelvinToCelsius(main?.temp_min)
  const maxTemp = kelvinToCelsius(main?.temp_max)
  const { main: weatherMain, description } = weather[0]

  const getIcon = () => {
    switch (weatherMain) {
      case 'Drizzle':
        return drizzleIcon
      case 'Rain':
        return rain
      case 'Snow':
        return snow
      case 'Clear':
        return clearSky
      case 'Clouds':
        return cloudy
      default:
        return clearSky
    }
  }

  return (
    <div
      className='pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between shadow-sm'
    >
      <p className='flex justify-between items-center'>
        <span className='font-medium'>{currentDay}</span>
        <span className='font-medium'>{localTime}</span>
      </p>
      <p className='pt-2 font-bold flex gap-1'>
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className='py-10 text-9xl font-bold self-center'>{temp}°</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
        </div>
        <p className='flex items-center gap-2'>
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  )
}

export default Temperature
