import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { useCurrentUser } from '@/contexts'

import { SECURE_STORE_PREFIX } from '@/config'

export const useLogout = () => {
  const { setUser } = useCurrentUser()

  return async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_PREFIX + 'accessToken')
    setUser(null)
    router.replace('/(public)/sign-in')
  }
}
