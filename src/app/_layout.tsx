import { ApolloProvider } from '@apollo/client'
import { Slot, useRouter, useSegments } from 'expo-router'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { AdminContextProvider, useCurrentAdmin } from '@/contexts'

import { createApolloClient } from '@/services/api'

import { toastConfig } from '@/config/toast'

function ProtectedRouteLayout() {
  const { admin } = useCurrentAdmin()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(authenticated)'

    if (!admin && inAuthGroup) return router.replace('/')

    if (admin && !inAuthGroup)
      return router.replace('/(authenticated)/dashboard')
  }, [admin, segments])

  return <Slot />
}

export default function RootLayout() {
  const client = createApolloClient()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <AdminContextProvider>
            <ProtectedRouteLayout />
            <Toast config={toastConfig} topOffset={60} position="top" />
          </AdminContextProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  )
}
