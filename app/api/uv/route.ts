// import Next.js server components for handing requests and responses
import { NextRequest, NextResponse } from 'next/server'

// asynchronously handle GET requests to this API route
export async function GET(req: NextRequest) {
  try {
    // extract latitude and longitude search parameters from the incoming request URL.
    const lat = req.nextUrl.searchParams.get('lat')
    const lon = req.nextUrl.searchParams.get('lon')

    // Ensure lat and lon are present in the request query
    if (!lat || !lon) {
      return new Response('Latitude and longitude parameters are required.', {
        status: 400,
      })
    }

    // construct the URL for the API request using the latitude, longitude, and specified parameters
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`

    // send a GET request to API with cache revalidation set to 900 seconds (15 minutes)
    const res = await fetch(url, {
      next: { revalidate: 900 },
    })

    // await and parse the JSON response from the API
    const uvData = await res.json()

    // return the UV data as a JSON response to the client
    return NextResponse.json(uvData)
  } catch (error) {
    // log the error to the console if the request fails
    console.log('Error Getting Uv Data')
    // return a 500 Internal Server Error response to the client if it failed getting UV data
    return new Response('Error getting UV Data', { status: 500 })
  }
}
