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

export const verifyIfAgeIsValid = (birthDate: string) => {
  const minimumAge = 18

  const [dia, mes, ano] = birthDate.split('/')
  const nascimento = new Date(Number(ano), Number(mes) - 1, Number(dia))

  const today = new Date()

  let age = today.getFullYear() - nascimento.getFullYear()

  const currentMonth = today.getMonth()
  const currentDay = today.getDate()
  const birthMonth = nascimento.getMonth()
  const birthDay = nascimento.getDate()

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--
  }

  return age >= minimumAge
}
