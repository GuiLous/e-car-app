import { Feather } from '@expo/vector-icons'
import { Redirect, Tabs, usePathname } from 'expo-router'
import { SafeAreaView, StyleSheet } from 'react-native'

import { useCurrentUser } from '@/contexts'

import { colors, PAGES_TO_HIDE_TABS } from '@/config'

export default function PublicLayout() {
  const { user } = useCurrentUser()
  const pathname = usePathname()

  const isSignInPage = pathname === '/sign-in'

  if (user && isSignInPage) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.blue[500],
          tabBarInactiveTintColor: colors.gray[500],
          tabBarStyle: PAGES_TO_HIDE_TABS.includes(pathname)
            ? { display: 'none' }
            : {
                height: 60,
                paddingBottom: 8,
                paddingTop: 8,
              },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="favorites/index"
          options={{
            title: 'Favoritos',
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="more/index"
          options={{
            title: 'Mais',
            tabBarIcon: ({ color, size }) => (
              <Feather name="more-horizontal" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="sign-in/index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
})
