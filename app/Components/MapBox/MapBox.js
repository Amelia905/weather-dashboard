'use client'
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useGlobalContext } from '@/app/context/globalContext'

// Component to handle flying to a new active city on the map.
function FlyToActiveCity({ activeCityCoords }) {
  // Hook to access the Leaflet map instance.
  const map = useMap()

  // Effect to fly to the new city coordinates when they change.
  useEffect(() => {
    if (activeCityCoords) {
      const zoomLev = 13
      const flyToOptions = {
        duration: 1.5,
      }

      // Fly the map to the new coordinates with specified zoom level and options.
      map.flyTo(
        [activeCityCoords.lat, activeCityCoords.lon],
        zoomLev,
        flyToOptions
      )
    }
  }, [activeCityCoords, map]) // Depend on activeCityCoords and map instance.

  // This component does not render anything itself.
  return null
}

// Main Mapbox component to display the map.
function Mapbox() {
  const { forecast } = useGlobalContext()

  // Destructure coordinates from forecast.

  const activeCityCoords = forecast?.coord

  if (!forecast || !forecast.coord || !activeCityCoords) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }

  // Render the map container with initial center, zoom level, and configuration.
  return (
    <div className='flex-1 basis-[50%] border rounded-lg'>
      <MapContainer
        center={[activeCityCoords.lat, activeCityCoords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className='rounded-lg m-4'
        style={{ height: '100%', width: '100%' }}
      >
        {/* URL template for map tiles. */}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity activeCityCoords={activeCityCoords} />
      </MapContainer>
    </div>
  )
}

export default Mapbox
