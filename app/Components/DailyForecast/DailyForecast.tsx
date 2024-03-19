// This component is executed only on the client side
'use client'
// Import necessary modules and components.
import React from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import { clearSky, cloudy, drizzleIcon, rain, snow } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import moment from 'moment'
import { kelvinToCelsius } from '@/app/utils/misc'

function DailyForecast() {
  // Destructure forecast data from global context.
  const { forecast, fiveDayForecast } = useGlobalContext()

  // Destructure detailed weather and location/city information.
  const { weather } = forecast
  const { city, list } = fiveDayForecast

  // Display a skeleton loader if forecast data is not fully loaded or available.
  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  if (!forecast || !weather) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  // Determine today's date as a string to filter today's forecasts.
  const today = new Date()
  const todayString = today.toISOString().split('T')[0]

  // Filter the list to get only today's forecasts based on the date.
  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString)
    }
  )

  // Determine the main weather condition for the first item in the weather array.
  const { main: weatherMain } = weather[0]

  if (todaysForecast.length < 1) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-3 flex items-center justify-center'>
        <p className='text-300 items-center'>Loading</p>
      </Skeleton>
    )
  }

  // Function to select the appropriate icon based on the main weather condition.
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

  // Render the component with a carousel of today's forecast times, icons, and temperatures.
  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 shadow-sm w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-3'>
      <div className='h-full flex gap-10 overflow-hidden'>
        {todaysForecast.length < 1 ? (
          <div className='flex justify-center items-center'>
            <h1 className='text-[3rem] line-through text-rose-500'>
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className='w-full'>
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className='flex flex-col gap-4 basis-[8.5rem] cursor-grab'
                      >
                        <p className='text-300'>
                          {moment(forecast.dt_txt).format('HH:mm')}
                        </p>
                        <p>{getIcon()}</p>
                        <p className='mt-4'>
                          {kelvinToCelsius(forecast.main.temp)}°C
                        </p>
                      </CarouselItem>
                    )
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyForecast
