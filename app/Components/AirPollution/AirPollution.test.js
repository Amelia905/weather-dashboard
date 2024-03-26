import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AirPollution from './AirPollution'

jest.mock('@/app/context/globalContext', () => ({
  useGlobalContext: jest.fn().mockImplementation(() => ({
    airQuality: {
      list: [
        {
          main: { aqi: 2 },
        },
      ],
    },
    isLoading: false,
  })),
}))

describe('AirPollution Component', () => {
  it('renders the component with provided context', async () => {
    render(<AirPollution />)
    const containerElement = await screen.findByTestId(
      'air-pollution-container'
    )
    expect(containerElement).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    render(<AirPollution />)
  })
})
