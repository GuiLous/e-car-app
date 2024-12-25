import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useCurrentUser } from '@/contexts'

import { useLogout } from '@/hooks/use-logout'

import { colors } from '@/config'

type FeatherIconName = keyof typeof Feather.glyphMap

type Tab = {
  name: string
  title: string
  icon: FeatherIconName
}

export default function AuthenticatedLayout() {
  const { user } = useCurrentUser()
  const logout = useLogout()
  const insets = useSafeAreaInsets()

  const userName = `${user?.firstName} ${user?.lastName}`

  const tabs: Tab[] = [
    {
      name: 'create_product',
      title: 'Anunciar veículo',
      icon: 'plus-circle',
    },
  ]

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.userName}>Olá, {userName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Feather name="log-out" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.gray[600],
          tabBarInactiveTintColor: colors.gray[500],
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size }) => (
                <Feather name={tab.icon} size={size} color={color} />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    backgroundColor: colors.gray[200],
    gap: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[800],
  },
  logoutButton: {
    padding: 8,
  },
})
