// Import axios for making HTTP requests
import axios from 'axios'
// import Next.js server components for handling requests and responses
import { NextRequest, NextResponse } from 'next/server'

// asynchronously handles GET requests to this API route.
export async function GET(req: NextRequest) {
  try {
    // retrieve api key from environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY
    // extract latitude and longitude search parameters from the incoming request URL.
    const lat = req.nextUrl.searchParams.get('lat')
    const lon = req.nextUrl.searchParams.get('lon')

    // Ensure lat and lon are present in the request query
    if (!lat || !lon) {
      return new Response('Latitude and longitude parameters are required.', {
        status: 400,
      })
    }

    // construct the URL for fetching daily forecast data from the API using the latitude, longitude, and API key
    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    // Send a GET request using axios and await the response
    const response = await axios.get(dailyUrl)

    // return the fetched daily weather data as a JSON response to the client
    return NextResponse.json(response.data)
  } catch (error) {
    // log any errors encountered during the fetch operation
    console.log('Error in getting air pollution data', error)
    // return a 500 Internal Server Error response to the client
    return new Response('Error fetching air pollution data', { status: 500 })
  }
}
