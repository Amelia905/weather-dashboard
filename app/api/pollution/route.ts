import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const searchParams = req.nextUrl.searchParams
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const res = await axios.get(url)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log('Error in getting air pollution data', error)
    return new Response('Error fetching air pollution data', { status: 500 })
  }
}
