import { jwtDecode } from 'jwt-decode'

export const isTokenValid = (token: string) => {
  const decodedToken = jwtDecode(token)

  return decodedToken.exp && decodedToken.exp * 1000 > Date.now()
}
