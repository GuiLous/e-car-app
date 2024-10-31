import { jwtDecode } from 'jwt-decode'

import { Admin } from '@/domain'

export const useGetAdminFromStorage = () => {
  const getAdminFromStorage = (token: string) => {
    const decodedToken = jwtDecode(token) as Admin

    return decodedToken
  }

  return { getAdminFromStorage }
}
