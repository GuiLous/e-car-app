import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button, Input } from '@/components/shared'

import { colors } from '@/config'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.gray[50],
      }}
    >
      <StatusBar backgroundColor={colors.gray[50]} style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            padding: 24,
            justifyContent: 'center',
          }}
        >
          <View style={{ gap: 4, marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: colors.gray[800],
              }}
            >
              Bem-vindo 👋
            </Text>
            <Text style={{ color: colors.gray[500] }}>
              Faça login para continuar
            </Text>
          </View>

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

            <Button title="Entrar" style={{ marginTop: 16 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
