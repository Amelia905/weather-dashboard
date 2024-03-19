// Import axios for making HTTP requests and Next.js server components for handling request and responses
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

// Asynchronously handles GET requests to this API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // retrieve the API key from environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY
    const { lat, lon } = req.query

    if (!lat || !lon) {
      res
        .status(400)
        .json({ message: 'Latitude and longitude parameters are required.' })
      return
    }

    // construct the URL for the API request using the latitude, longitude, and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const response = await axios.get(url)
    res.status(200).json(response.data)
  } catch (error) {
    // log the error to the console if the request fails
    console.error('Error in getting air pollution data', error)
    res.status(500).json({ message: 'Error fetching air pollution data' })
  }
}
