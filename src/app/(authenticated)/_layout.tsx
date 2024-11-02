import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useCurrentAdmin } from '@/contexts'

import { useLogout } from '@/hooks/use-logout'

import { useScannerStore } from '@/stores'

import { colors } from '@/config'

export default function AuthenticatedLayout() {
  const { admin } = useCurrentAdmin()
  const logout = useLogout()
  const { showScanner } = useScannerStore()

  const userName = `${admin?.first_name} ${admin?.last_name}`

  return (
    <>
      {!showScanner && (
        <View style={styles.header}>
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
        <Tabs.Screen
          name="dashboard/index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="ticket/index"
          options={{
            title: 'Ingressos',
            tabBarIcon: ({ color, size }) => (
              <Feather name="file-text" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="qr-code/index"
          options={{
            title: 'QR Code',
            tabBarIcon: ({ color, size }) => (
              <Feather name="camera" size={size} color={color} />
            ),
          }}
        />
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
