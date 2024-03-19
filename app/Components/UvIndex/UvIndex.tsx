'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { sun } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { UvProgress } from '../UvProgress/UvProgress'

function UvIndex() {
  const { uvIndex } = useGlobalContext()

  if (!uvIndex || !uvIndex.daily) {
    return (
      <Skeleton className='h-[12rem] w-full col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-3 flex items-center justify-center'>
        <p className='text-300 items-center'>Loading</p>
      </Skeleton>
    )
  }

  // Destructure daily UV index data, including max values.
  const { daily } = uvIndex
  const { uv_index_max } = daily

  // Formats the maximum UV index value for display.
  const uvIndexMax = uv_index_max[0].toFixed(0)

  // Categorize UV index levels into descriptive text and protection advice.
  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: 'Low',
        protection: 'No protection required',
      }
    } else if (uvIndex <= 5) {
      return {
        text: 'Moderate',
        protection: 'Stay in shade near midday.',
      }
    } else if (uvIndex <= 7) {
      return {
        text: 'High',
        protection: 'Wear a hat and sunglasses.',
      }
    } else if (uvIndex <= 10) {
      return {
        text: 'Very High',
        protection: 'Apply sunscreen SPF 30+ every 2 hours.',
      }
    } else if (uvIndex > 10) {
      return {
        text: 'Extreme',
        protection: 'Avoid being outside.',
      }
    } else {
      return {
        text: 'Extreme',
        protection: 'Avoid being outside.',
      }
    }
  }

  // Calculates margin left percentage for the UV Progress component based on the max UV index.
  const marginLeftPercentage = (uvIndexMax / 14) * 100

  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 shadow-sm'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>{sun} Uv Index</h2>
        <div className='pt-4 flex flex-col gap-1'>
          <p className='text-2xl'>
            {uvIndexMax}
            <span className='text-sm'>
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgress
            value={marginLeftPercentage}
            max={14}
            className='progress'
          />
        </div>
      </div>

      <p className='text-sm'>{uvIndexCategory(uvIndexMax).protection} </p>
    </div>
  )
}

export default UvIndex
