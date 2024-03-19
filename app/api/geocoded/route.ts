import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // retrieve the API key from environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY

    // extract search parameters from the incoming request URL. Expecting a 'search' parameter for the city name.
    const searchParams = req.nextUrl.searchParams
    const city = searchParams.get('search')
    // construct the URL for the OpenWeatherMap geocoding API, including the city query and the API key.
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

    // use axios to send a GET request to the URL and await the response
    const res = await axios.get(url)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log('Error fetching geocoded data')
    return new Response('Error fetching geocoded data', { status: 500 })
  }
}
