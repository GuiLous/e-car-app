import { jwtDecode } from 'jwt-decode'

import { User } from '@/domain'

export const useGetUserFromStorage = () => {
  const getUserFromStorage = (token: string) => {
    const decodedToken = jwtDecode(token) as User

    return decodedToken
  }

  return { getUserFromStorage }
}
