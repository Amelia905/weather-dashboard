import AirPollution from './Components/AirPollution/AirPollution'
import Sunset from './Components/Sunset/Sunset'
import Navbar from './Components/Navbar'
import Temperature from './Components/Temperature/Temperature'
import DailyForecast from './Components/DailyForecast/DailyForecast'
import FeelsLike from './Components/FeelsLike/FeelsLike'
import Humidity from './Components/Humidity/Humidity'
import Visibility from './Components/Visibility/Visibility'
import FiveDayForecast from './Components/FiveDayForecast/FiveDayForecast'
import Wind from './Components/Wind/Wind'
import UvIndex from './Components/UvIndex/UvIndex'

export default function home() {
  return (
    <main className='mx=[1rem] lg:mx=[2rem] xl:mx-[6rem] 2xl:mx-[6rem] m-auto'>
      <Navbar />
      <div className='pb-4 flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]'>
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className='flex flex-col w-full'>
          <div className='instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4'>
            <AirPollution />
            <DailyForecast />
            <Wind />
            <UvIndex />
            <Sunset />
            <FeelsLike />
            <Humidity />
            <Visibility />
          </div>
        </div>
      </div>
    </main>
  )
}
