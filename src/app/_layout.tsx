import { ApolloProvider } from '@apollo/client'
import { Slot, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { UserContextProvider, useCurrentUser } from '@/contexts'

import { createApolloClient } from '@/services/api'

import { colors } from '@/config'
import { toastConfig } from '@/config/toast'

function ProtectedRouteLayout() {
  const { user } = useCurrentUser()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(authenticated)'

    if (!user && inAuthGroup) return router.replace('/')
  }, [user, segments])

  return <Slot />
}

export default function RootLayout() {
  const client = createApolloClient()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <UserContextProvider>
            {Platform.OS === 'ios' ? (
              <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
                <StatusBar
                  barStyle="light-content"
                  backgroundColor={colors.black}
                />
                <ProtectedRouteLayout />
              </SafeAreaView>
            ) : (
              <>
                <StatusBar
                  barStyle="light-content"
                  backgroundColor={colors.black}
                />
                <ProtectedRouteLayout />
              </>
            )}

            <Toast config={toastConfig} topOffset={30} position="top" />
          </UserContextProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  )
}
