// Import axios for making HTTP requests and Next.js server components for handling request and responses
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// Asynchronously handles GET requests to this API route
export async function GET(req: NextRequest) {
  try {
    // retrieve the API key from environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY

    // extract search parameters from the request URL
    const searchParams = req.nextUrl.searchParams

    // extract latitude and longitude from search parameters
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    // construct the URL for the API request using the latitude, longitude, and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    // use axios to send a GET request to the API and await the response
    const res = await axios.get(url)
    // return the response from API as a json response to the client
    return NextResponse.json(res.data)
  } catch (error) {
    // log the error to the console if the request fails
    console.log(' Error fetching forecast data')
    // return a 500 Internal Server Error response to the client
    return new Response('Error fetching forecast data', { status: 500 })
  }
}
