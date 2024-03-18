import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const lat = 49.2827
    const lon = 45.6784

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const res = await axios.get(url)
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(' Error fetching forecast data')
    return new Response('Error fetching forecast data', { status: 500 })
  }
}
