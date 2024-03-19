// Import statements for types, fonts, and CSS.
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ContextProvider } from './Providers/ContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'A weather app built with Next.js and TailwindCSS',
}

// wraps the entire application and provides a structured layout and injects global contexts and styles.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  )
}
