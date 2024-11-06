export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

export const formatAmountToBRL = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

export const formatDateToISO = (date: string) => {
  const [day, month, year] = date.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`
}

export const formatDateToBRL = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
