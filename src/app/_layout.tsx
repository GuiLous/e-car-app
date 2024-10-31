import { ApolloProvider } from '@apollo/client'
import { Slot } from 'expo-router'
import React from 'react'

import { createApolloClient } from '@/services/api/apollo-cliente'

const client = createApolloClient()

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Slot />
    </ApolloProvider>
  )
}
