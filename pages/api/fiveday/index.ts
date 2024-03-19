import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

// async function that handles the request.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const { lat, lon } = req.query

    if (!lat || !lon) {
      res
        .status(400)
        .json({ message: 'Latitude and longitude parameters are required.' })
      return
    }

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const response = await axios.get(dailyUrl)

    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error in getting daily weather data', error)
    res.status(500).json({ message: 'Error fetching daily weather data' })
  }
}
