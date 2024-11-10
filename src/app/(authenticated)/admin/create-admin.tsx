import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { useCreateAdminMutation } from '@/services/api/admin'

import { Button, Input } from '@/components/shared'
import { Select } from '@/components/shared/select'

import { colors } from '@/config'

type AdminData = {
  firstName: string
  lastName: string
  email: string
  role: 'master' | 'director' | 'member'
  password: string
  passwordConfirmation: string
  phoneNumber: string
}

const ROLE_OPTIONS = [
  { label: 'Membro', value: 'member' },
  { label: 'Diretor', value: 'director' },
  { label: 'Presidente', value: 'master' },
]

export default function CreateAdmin() {
  const { createAdminMutation } = useCreateAdminMutation()

  const [formData, setFormData] = useState<AdminData>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'member',
    password: '',
    passwordConfirmation: '',
    phoneNumber: '',
  })

  const disableSubmitButton =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phoneNumber ||
    !formData.password ||
    !formData.passwordConfirmation

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'member',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
    })
  }

  const handleSubmit = () => {
    createAdminMutation({
      payload: formData,
      onSuccess: resetForm,
    })
  }

  const handleChange = (field: keyof AdminData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={{ zIndex: 1, elevation: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Criar novo usuário</Text>

          <View style={styles.form}>
            <Input
              label="Nome *"
              value={formData.firstName}
              onChangeText={(value) => handleChange('firstName', value)}
              placeholder="Primeiro Nome"
            />

            <Input
              label="Sobrenome *"
              value={formData.lastName}
              onChangeText={(value) => handleChange('lastName', value)}
              placeholder="Sobrenome"
            />

            <Input
              label="Email *"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              placeholder="Email"
            />

            <Input
              label="Telefone *"
              value={formData.phoneNumber}
              onChangeText={(value) => handleChange('phoneNumber', value)}
              keyboardType="phone-pad"
              placeholder="Telefone"
            />

            <Input
              label="Senha *"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
            />

            <Input
              label="Confirmação de Senha *"
              value={formData.passwordConfirmation}
              onChangeText={(value) =>
                handleChange('passwordConfirmation', value)
              }
              placeholder="Confirmação de Senha"
            />

            <Select
              label="Permissão *"
              value={formData.role}
              options={ROLE_OPTIONS}
              onValueChange={(value: string) => handleChange('role', value)}
              placeholder="Selecione uma permissão"
            />

            <Button
              disabled={disableSubmitButton}
              title="Registrar Pedido"
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    zIndex: 1,
    elevation: 1,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
    elevation: 1,
  },
  scrollContent: {
    paddingBottom: 46,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.gray[700],
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: colors.white,
  },
  errorText: {
    color: colors.red[500],
    fontSize: 12,
    marginTop: -12,
  },
})
