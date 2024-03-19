import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lat, lon } = req.query

    if (!lat || !lon) {
      res
        .status(400)
        .json({ message: 'Latitude and longitude parameters are required.' })
      return
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`

    const response = await axios.get(url)

    // Axios automatically parses the JSON response, so you can just return the data.
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error getting UV Data', error)
    res.status(500).json({ message: 'Error getting UV Data' })
  }
}
