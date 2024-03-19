'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { wind } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import React from 'react'

function Wind() {
  const { forecast } = useGlobalContext()

  const windSpeed = forecast?.wind?.speed
  const windDir = forecast?.wind?.deg

  // Extracts wind speed and direction from the forecast data.
  if (!windSpeed || !windDir) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-3 flex items-center justify-center'>
        <p className='text-300 items-center'>Loading</p>
      </Skeleton>
    )
  }

  return (
    <div
      className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
    flex-col gap-3 shadow-sm'
    >
      <h2 className='flex items-center gap-2 font-medium'>{wind} Wind</h2>

      <div className='compass relative flex items-center justify-center'>
        <div className='image relative'>
          {/* Displays the compass body image. */}
          <Image
            src='/compass_body.svg'
            alt='compass'
            width={110}
            height={110}
          />
          {/* Displays the compass arrow image, rotated according to wind direction. */}
          <Image
            src='/compass_arrow.svg'
            alt='compass'
            className='absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert'
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: '100%',
            }}
            width={11}
            height={11}
          />
        </div>
        <p className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs font-medium'>
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  )
}

export default Wind
