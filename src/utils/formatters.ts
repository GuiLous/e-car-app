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

export const applyInputMask = (value: string, mask: 'cpf' | 'rg' | 'phone') => {
  const onlyNumbers = value.replace(/\D/g, '')

  switch (mask) {
    case 'cpf':
      return onlyNumbers
        .slice(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, p1, p2, p3, p4) =>
          p4 ? `${p1}.${p2}.${p3}-${p4}` : `${p1}.${p2}.${p3}`,
        )
    case 'rg':
      return onlyNumbers.slice(0, 13).replace(/(\d{12})(\d{1})/, '$1-$2')
    case 'phone':
      return onlyNumbers
        .slice(0, 11)
        .replace(/(\d{2})(\d{4,5})(\d{4})/, (_, p1, p2, p3) =>
          p2.length === 5 ? `(${p1}) ${p2}-${p3}` : `(${p1}) ${p2}-${p3}`,
        )
    default:
      return value
  }
}
