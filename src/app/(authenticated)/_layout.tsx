import { Feather } from '@expo/vector-icons'
import { Tabs, usePathname } from 'expo-router'

import { colors, PAGES_TO_HIDE_TABS } from '@/config'

export default function AuthenticatedLayout() {
  const pathname = usePathname()

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
        name="sign-in/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}
