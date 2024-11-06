import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { TextInputProps } from 'react-native'

import { Input } from '@/components/shared/input'

import { colors } from '@/config'

import { validateDate } from '@/utils'

interface DateInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: string
  onChangeText: (text: string) => void
  label?: string
  error?: boolean
}

export function DateInput({
  value,
  onChangeText,
  label,
  error,
  ...rest
}: DateInputProps) {
  const [hasError, setHasError] = useState(false)
  const [rawValue, setRawValue] = useState(value)

  const maskDate = (text: string) => {
    const cleanText = text.replace(/\D/g, '')

    let maskedText = ''

    if (cleanText.length <= 2) {
      maskedText = cleanText
    } else if (cleanText.length <= 4) {
      maskedText = `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`
    } else {
      maskedText = `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4, 8)}`
    }

    return maskedText
  }

  const handleChangeText = (text: string) => {
    const maskedText = maskDate(text)
    setRawValue(maskedText)

    if (maskedText.length === 10) {
      if (validateDate(maskedText)) {
        setHasError(false)
        return onChangeText(maskedText)
      }
    }

    onChangeText('')
    setHasError(true)
  }

  useEffect(() => {
    setRawValue(value)
  }, [value])

  return (
    <Input
      label={label}
      value={rawValue}
      onChangeText={handleChangeText}
      placeholder="DD/MM/YYYY"
      keyboardType="numeric"
      maxLength={10}
      error={error || hasError}
      rightIcon={
        <Feather
          name="calendar"
          size={20}
          color={error ? colors.red[500] : colors.gray[500]}
        />
      }
      {...rest}
    />
  )
}
