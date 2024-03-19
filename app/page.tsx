// Directive to ensure this component runs only on the client side for Next.js optimization.
'use client'
// Custom hook to access the global context updater function.
import { useGlobalContextUpdate } from './context/globalContext'

// Importing UI components for various weather information displays.
import AirPollution from './Components/AirPollution/AirPollution'
import DailyForecast from './Components/DailyForecast/DailyForecast'
import FeelsLike from './Components/FeelsLike/FeelsLike'
import Humidity from './Components/Humidity/Humidity'
import Navbar from './Components/Navbar'
import Sunset from './Components/Sunset/Sunset'
import Temperature from './Components/Temperature/Temperature'
import UvIndex from './Components/UvIndex/UvIndex'
import Visibility from './Components/Visibility/Visibility'
import Wind from './Components/Wind/Wind'
import FiveDayForecast from './Components/FiveDayForecast/FiveDayForecast'
import MapBox from './Components/MapBox/MapBox'
import Pressure from './Components/Pressure/Pressure'

// Importing utility for default city states.
import defaultStates from './utils/defaultStates'

export default function Home() {
  // Accesses the function to update active city coordinates within global context.
  const { setActiveCityCoords } = useGlobalContextUpdate()

  // Update the active city coordinates and scroll to the top of the page.
  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon])

    // Smoothly scrolls to the top of the page.
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Renders the home page layout.
  return (
    <main className='mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
      <div className='pb-4 flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem] auto-rows-auto gap-y-4'>
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className='flex flex-col w-full'>
          <div className='instruments grid auto-rows-auto gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className='mapbox-con mt-4 flex gap-4'>
            <MapBox />
            <div className='states flex flex-col gap-3 flex-1'>
              <h2 className='flex items-center gap-2 font-medium'>
                Top Cities
              </h2>
              <div className='flex flex-col gap-4'>
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className='border rounded-lg cursor-pointer shadow-sm'
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon)
                      }}
                    >
                      <p className='px-6 py-4'>{state.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className='py-4 flex justify-center pb-8'>
        <p className='footer-text text-sm flex items-center gap-1'>
          Made by
          <a
            href='https://www.linkedin.com/in/amelia-sun/'
            target='_blank'
            className=' text-green-300 font-bold'
          >
            Amelia Sun
          </a>
        </p>
      </footer>
    </main>
  )
}
