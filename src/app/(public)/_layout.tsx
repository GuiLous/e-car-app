import { Feather } from '@expo/vector-icons'
import { Redirect, Tabs, usePathname } from 'expo-router'

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
        headerStyle: {
          backgroundColor: colors.black,
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[200],
        },
        headerTitleStyle: {
          color: colors.white,
          textAlign: 'center',
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
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
          headerShown: true,
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more/index"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Feather name="more-horizontal" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(account)"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}
