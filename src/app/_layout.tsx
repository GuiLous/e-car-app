import { ApolloProvider } from '@apollo/client'
import { Slot, useRouter, useSegments } from 'expo-router'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

import { AdminContextProvider, useCurrentAdmin } from '@/contexts'

import { createApolloClient } from '@/services/api'

import { colors } from '@/config'

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
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.gray[50],
          }}
        >
          <AdminContextProvider>
            <ProtectedRouteLayout />
            <Toast />
          </AdminContextProvider>
        </SafeAreaView>
      </ApolloProvider>
    </GestureHandlerRootView>
  )
}
