// Import moment.js library for date and time manipulation.
import moment from 'moment'

// Converts temperature from Kelvin to Celsius by subtracting 273.15 and rounding the result.
export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15)
}

// An array that maps air quality index ratings to descriptive text.
export const airQualityIndexText = [
  {
    rating: 10,
    description: 'excellent',
  },
  {
    rating: 20,
    description: 'good',
  },
  {
    rating: 30,
    description: 'satisfactory',
  },
  {
    rating: 40,
    description: 'fair',
  },
  {
    rating: 50,
    description: 'moderate',
  },
  {
    rating: 60,
    description: 'moderate',
  },
  {
    rating: 70,
    description: 'poor',
  },
  {
    rating: 80,
    description: 'poor',
  },
  {
    rating: 90,
    description: 'very poor',
  },
  {
    rating: 100,
    description: 'very poor',
  },
]

// Converts a Unix timestamp to a formatted time string based on a specified timezone.
// The timezone is converted from seconds to hours for `utcOffset`.
// The time is formatted in 24-hour format with AM/PM indicator.
export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format('HH:mm A')
}

// Converts a Unix timestamp to a string representing the day of the week (e.g., "Mon").
export const unixToDay = (unix: number) => {
  return moment.unix(unix).format('ddd')
}
