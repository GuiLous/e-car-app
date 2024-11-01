import { FC, useEffect, useState } from 'react'
import { View } from 'react-native'

import { useAuth } from '@/services/api'

import { Button, Input } from '@/components/shared'

export const Form: FC = () => {
  const { signInMutation, loading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleClearError = () => {
    setHasError(false)
  }

  const handleErrorSignIn = () => {
    setHasError(true)
  }

  const handleSignIn = () => {
    signInMutation({ payload: { email, password }, onError: handleErrorSignIn })
  }

  useEffect(() => {
    if (hasError && (email || password)) handleClearError()
  }, [email, password])

  return (
    <View style={{ gap: 16 }}>
      <Input
        label="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        error={hasError}
      />

      <Input
        label="Senha"
        placeholder="Digite sua senha"
        isPassword
        value={password}
        onChangeText={setPassword}
        error={hasError}
      />

      <Button
        loading={loading}
        disabled={!email || !password}
        title="Entrar"
        style={{ marginTop: 16 }}
        onPress={handleSignIn}
      />
    </View>
  )
}
