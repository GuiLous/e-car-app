import { router } from 'expo-router'
import { FC, useEffect, useState } from 'react'
import { View } from 'react-native'

import { useSignInMutation } from '@/services/api'

import { Button, Input } from '@/components/shared'

export const Form: FC = () => {
  const { signInMutation, loading } = useSignInMutation()

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

  const handleRedirectToSignUp = () => router.push('/sign-up')

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

      <View style={{ gap: 12 }}>
        <Button
          loading={loading}
          disabled={!email || !password}
          title="Entrar"
          style={{ marginTop: 16 }}
          onPress={handleSignIn}
        />

        <Button
          title="Criar uma conta"
          onPress={handleRedirectToSignUp}
          variant="secondary"
        />
      </View>
    </View>
  )
}
