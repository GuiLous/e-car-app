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

export const isValidCellphone = (cellphone: string) => {
  const cleanCellphone = cellphone.replace(/\D/g, '').replace(/\s+/g, '')

  return cleanCellphone.length >= 10
}

export const isValidCPF = (cpf: string): boolean => {
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false

  const calculateCheckDigit = (num: string, factor: number): number => {
    let total = 0
    for (let i = 0; i < num.length; i++) {
      total += parseInt(num[i]) * (factor - i)
    }
    const remainder = total % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const firstCheckDigit = calculateCheckDigit(cpf.slice(0, 9), 10)
  const secondCheckDigit = calculateCheckDigit(cpf.slice(0, 10), 11)

  return (
    firstCheckDigit === parseInt(cpf[9]) &&
    secondCheckDigit === parseInt(cpf[10])
  )
}

export function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}
