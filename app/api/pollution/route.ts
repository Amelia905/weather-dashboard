// import axios for making HTTP requests and Next.js server components for handling requests and responses.
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// define an asynchronous function to handle GET requests to the API route.
export async function GET(req: NextRequest) {
  try {
    // retrieve the OpenWeather API key from environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY

    // extract latitude and longitude search parameters from the incoming request URL.
    const searchParams = req.nextUrl.searchParams
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

    // use axios to send a GET request to the API and await the response.
    const res = await axios.get(url)

    // return the air pollution data from the response as a JSON object in the Next.js response.
    return NextResponse.json(res.data)
  } catch (error) {
    // log any errors to the console for debugging
    console.log('Error in getting air pollution data', error)
    return new Response('Error fetching air pollution data', { status: 500 })
  }
}
