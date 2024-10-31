import { FC, useState } from 'react'
import { View } from 'react-native'

import { useAuth } from '@/services/api'

import { Button, Input } from '@/components/shared'

export const Form: FC = () => {
  const { signInMutation } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = () => {
    signInMutation({ payload: { email, password } })
  }

  return (
    <View style={{ gap: 16 }}>
      <Input
        label="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        label="Senha"
        placeholder="Digite sua senha"
        isPassword
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" style={{ marginTop: 16 }} onPress={handleSignIn} />
    </View>
  )
}
