import { jwtDecode } from 'jwt-decode'

export const isTokenValid = (token: string) => {
  const decodedToken = jwtDecode(token)

  return decodedToken.exp && decodedToken.exp * 1000 > Date.now()
}

export const validateDate = (date: string) => {
  if (date.length !== 10) return false

  const [day, month, year] = date.split('/').map(Number)

  if (month < 1 || month > 12 || day < 1 || day > 31) return false

  const daysInMonth = new Date(year, month, 0).getDate()
  if (day > daysInMonth) return false

  return true
}
