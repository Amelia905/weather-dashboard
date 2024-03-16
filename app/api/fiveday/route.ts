import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const lat = 49.2827
    const lon = 123.1207

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    })

    const dailyData = await dailyRes.json()

    return NextResponse.json(dailyData)
  } catch (error) {
    console.log('Error in getting air pollution data', error)
    return new Response('Error fetching air pollution data', { status: 500 })
  }
}
