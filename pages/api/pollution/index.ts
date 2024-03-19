// import axios for making HTTP requests and Next.js server components for handling requests and responses.
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // retrieve the OpenWeather API key from environment variables
    const apiKey = process.env.OPENWEATHER_API_KEY
    const { lat, lon } = req.query

    if (!lat || !lon) {
      res
        .status(400)
        .json({ message: 'Latitude and longitude parameters are required.' })
      return
    }

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

    // use axios to send a GET request to the API and await the response.
    const response = await axios.get(url)

    // return the air pollution data from the response as a JSON object in the Next.js response.
    res.status(200).json(response.data)
  } catch (error) {
    // log any errors to the console for debugging
    console.error('Error in getting air pollution data', error)
    res.status(500).json({ message: 'Error fetching air pollution data' })
  }
}
