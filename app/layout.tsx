import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ContextProvider } from './Providers/ContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather Dashboard',
  description: 'A weather app built with Next.js and TailwindCSS',
}

// The RootLayout component now uses ContextProvider to wrap the children.
// This will provide the global context to all child components within the app.
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
