import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useCurrentAdmin } from '@/contexts'

import { useLogout } from '@/hooks/use-logout'

import { useScannerStore } from '@/stores'

import { AdminRole } from '@/domain'

import { colors } from '@/config'

type FeatherIconName = keyof typeof Feather.glyphMap

type Tab = {
  name: string
  title: string
  icon: FeatherIconName
  roles: AdminRole[]
}

export default function AuthenticatedLayout() {
  const { admin } = useCurrentAdmin()
  const { showScanner } = useScannerStore()
  const logout = useLogout()
  const insets = useSafeAreaInsets()

  const userName = `${admin?.firstName} ${admin?.lastName}`

  const tabs: Tab[] = [
    {
      name: 'dashboard',
      title: 'Dashboard',
      icon: 'home',
      roles: ['master', 'director', 'member'],
    },
    {
      name: 'admin',
      title: 'Usuários',
      icon: 'users',
      roles: ['master'],
    },
    {
      name: 'ticket/create-ticket',
      title: 'Ingressos',
      icon: 'file-text',
      roles: ['master', 'director'],
    },
    {
      name: 'ticket/list-tickets',
      title: 'Meus Ingressos',
      icon: 'file',
      roles: ['master', 'director'],
    },
    {
      name: 'qr-code/index',
      title: 'QR Code',
      icon: 'camera',
      roles: ['master', 'director', 'member'],
    },
  ]

  const userHasAccess = (tabRoles: AdminRole[]) =>
    tabRoles.includes(admin?.role || 'member')

  return (
    <>
      {!showScanner && (
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text style={styles.userName}>Olá, {userName}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Feather name="log-out" size={24} color={colors.error} />
          </TouchableOpacity>
        </View>
      )}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary[600],
          tabBarInactiveTintColor: colors.gray[500],
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        {tabs.map((tab) =>
          userHasAccess(tab.roles) ? (
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
          ) : (
            <Tabs.Screen
              key={tab.name}
              name={tab.name}
              options={{
                href: null,
              }}
            />
          ),
        )}
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
