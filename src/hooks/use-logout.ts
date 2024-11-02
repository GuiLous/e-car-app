import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { useCurrentAdmin } from '@/contexts'

import { SECURE_STORE_PREFIX } from '@/config'

export const useLogout = () => {
  const { setAdmin } = useCurrentAdmin()

  return async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_PREFIX + 'accessToken')
    setAdmin(null)
    router.replace('/(public)/sign-in')
  }
}
