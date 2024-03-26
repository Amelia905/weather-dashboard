// /Users/mine/Desktop/weather-dashboard/jest.config.js
module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': [
      'babel-jest',
      { configFile: './babel.jest.config.js' }, // Specify Jest-specific Babel config
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1', // Handle '@/lib/utils'
  },
  testEnvironment: 'jsdom',
}
