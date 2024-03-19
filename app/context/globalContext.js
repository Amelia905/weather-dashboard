// Ensures this component runs only on the client side for Next.js optimization.
'use client'

// Import statements for necessary libraries and hooks.
import axios from 'axios'
import React, { useContext, createContext, useState, useEffect } from 'react'
import defaultStates from '../utils/defaultStates'
import { debounce } from 'lodash'

// Create contexts for global state and its updater.
const GlobalContext = createContext()
const GlobalContextUpdate = createContext()

// Define the provider component for the global context.
export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({})
  const [geoCodedList, setGeoCodedList] = useState(defaultStates)
  const [inputValue, setInputValue] = useState('')

  const [activeCityCoords, setActiveCityCoords] = useState([49.2827, -123.1207]) // Default set to Vancouver, BC

  const [airQuality, setAirQuality] = useState({})
  const [fiveDayForecast, setFiveDayForecast] = useState({})
  const [uvIndex, seUvIndex] = useState({})

  // Fetches the current weather forecast based on latitude and longitude.
  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`)

      setForecast(res.data)
    } catch (error) {
      console.log('Error fetching forecast data: ', error.message)
    }
  }

  // Fetches air quality data.
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`)
      setAirQuality(res.data)
    } catch (error) {
      console.log('Error fetching air quality data: ', error.message)
    }
  }

  // Five day forecast
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`)

      setFiveDayForecast(res.data)
    } catch (error) {
      console.log('Error fetching five day forecast data: ', error.message)
    }
  }

  // Fetches a list of locations based on a search query.
  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`)
      setGeoCodedList(res.data)
    } catch (error) {
      console.log('Error fetching geocoded list: ', error.message)
    }
  }

  // Fetch uv data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`)

      seUvIndex(res.data)
    } catch (error) {
      console.error('Error fetching the forecast:', error)
    }
  }

  // Handle user input in the search bar and fetches geocoded list accordingly
  const handleInput = (e) => {
    setInputValue(e.target.value)

    if (e.target.value === '') {
      setGeoCodedList(defaultStates)
    }
  }

  // Debounce function, put delay  every time input changes in the search
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search)
    }, 300)

    if (inputValue) {
      debouncedFetch(inputValue)
    }

    // Cleanup
    return () => debouncedFetch.cancel()
  }, [inputValue])

  // Fetches all data related to the active city coordinates when they change.
  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1])
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1])
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1])
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1])
  }, [activeCityCoords]) // Fetch calls for forecast, air quality, five-day forecast, and UV index.

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
}

// Custom hooks to easily use global context and its updater in components.
export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)
