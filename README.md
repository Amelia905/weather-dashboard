# Weather Dashboard

A weather dashboard application built with Next.js and TailwindCSS, showcasing current weather, air quality, UV index, and a five-day forecast for locations worldwide. This project leverages the OpenWeatherMap API for weather data.

## Features

- Current weather conditions
- Air quality index
- UV index
- Five-day weather forecast
- Dynamic search for global locations
- Responsive design

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn (package manager)

### Setup Instructions

1. **Clone the repository**

```bash
   `git clone https://github.com/Amelia905/weather-dashboard.git
   cd weather-dashboard
```

2. **Install dependencies**

```bash
# Using npm:
npm install
# or using yarn:
yarn install
```

3. **Obtain an API Key from OpenWeatherMap**

Visit OpenWeatherMap and sign up for an account.

Navigate to the API section and subscribe to the desired API services (e.g., Current Weather Data, Air Pollution API, etc.).

Copy your API key from the API keys section of your account.

4. **Configure the API Key**

Create a `.env` file in the root directory of your project and add your API key:
OPENWEATHER_API_KEY=c5e49bc115a7f181726c1776f1275a53

5. **Run the application**
   `npm run dev` or `yarn dev`

   Visit http://localhost:3000 in your browser to view the application.

## Testing

This project includes basic unit tests for components using Jest and React Testing Library.
To run the tests, execute:
`npm test` or `yarn test`

## Contributing

Contributions to the Weather Dashboard project are welcome. Please ensure to follow the established coding and documentation standards.
