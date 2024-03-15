// Enabling the React concurrent features on the client side.
'use client'

import React from 'react'
import { GlobalContextProvider } from '@/app/context/globalContext'

// Defining the type for the props that the ContextProvider component will accept. In this case, it is expecting a 'children' prop which can be any valid React node.
type ContextProviderProps = {
  children: React.ReactNode
}

// Defining the ContextProvider component. This component takes in props of type ContextProviderProps.
export function ContextProvider({ children }: ContextProviderProps) {
  // The component returns the GlobalContextProvider with the 'children' nested inside.
  // This structure allows any child components to have access to the global context values and functions provided by GlobalContextProvider.
  return <GlobalContextProvider>{children}</GlobalContextProvider>
}
