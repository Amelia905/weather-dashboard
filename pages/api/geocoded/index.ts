// pages/api/geocoded/index.ts
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

// async function that handles the request.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const city = req.query.search

    if (!city) {
      res.status(400).json({ message: 'Search parameter is required.' })
      return
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

    // Send a GET request using axios and await the response
    const response = await axios.get(url)

    // Return the response data as JSON
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error fetching geocoded data', error)
    res.status(500).json({ message: 'Error fetching geocoded data' })
  }
}
