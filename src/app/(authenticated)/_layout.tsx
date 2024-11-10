import { Feather } from '@expo/vector-icons'
import { Slot } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useCurrentAdmin } from '@/contexts'

import { useLogout } from '@/hooks/use-logout'

import { useScannerStore } from '@/stores'

import { colors } from '@/config'

export default function AuthenticatedLayout() {
  const { admin } = useCurrentAdmin()
  const { showScanner } = useScannerStore()
  const logout = useLogout()
  const insets = useSafeAreaInsets()

  const userName = `${admin?.first_name} ${admin?.last_name}`

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

      <Slot />
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
