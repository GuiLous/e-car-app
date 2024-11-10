import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
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

import { useCreateTicketMutation } from '@/services/api'

import { Button, DateInput, Input } from '@/components/shared'

import { colors } from '@/config'

import { formatDateToISO, validateDate } from '@/utils'

export default function CreateTicket() {
  const { createTicketMutation, loading } = useCreateTicketMutation()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    location: '',
    date: '',
    footerDescription: '',
  })

  const hasDateError = !validateDate(formData.date)
  const handleResetForm = () => {
    setFormData({
      name: '',
      description: '',
      city: '',
      state: '',
      location: '',
      date: '',
      footerDescription: '',
    })
  }

  const handleSubmit = () => {
    createTicketMutation({
      payload: { ...formData, date: new Date(formatDateToISO(formData.date)) },
      onSuccess: handleResetForm,
    })
  }

  const isButtonDisabled =
    !formData.name ||
    !formData.description ||
    !formData.city ||
    !formData.state ||
    !formData.location ||
    !formData.date ||
    hasDateError

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Cadastrar Ingresso</Text>

          <View style={styles.form}>
            <Input
              label="Nome"
              placeholder="Node do evento..."
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <Input
              label="Descrição"
              placeholder="Descrição do convite..."
              multiline
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />

            <Input
              label="Cidade"
              placeholder="Cidade do evento..."
              value={formData.city}
              onChangeText={(text) => setFormData({ ...formData, city: text })}
            />

            <Input
              label="Estado"
              placeholder="Estado do evento..."
              value={formData.state}
              onChangeText={(text) => setFormData({ ...formData, state: text })}
            />

            <Input
              label="Local"
              placeholder="Local do evento..."
              value={formData.location}
              onChangeText={(text) =>
                setFormData({ ...formData, location: text })
              }
            />

            <DateInput
              label="Data"
              placeholder="Data do evento"
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
            />

            <Input
              label="Descrição de rodapé"
              placeholder="Descrição de rodapé do ingresso "
              multiline
              value={formData.footerDescription}
              onChangeText={(text) =>
                setFormData({ ...formData, footerDescription: text })
              }
            />

            <Button
              title="Criar Ticket"
              leftIcon={
                <Feather
                  name="plus"
                  color={isButtonDisabled ? colors.gray[500] : colors.white}
                  size={20}
                />
              }
              loading={loading}
              onPress={handleSubmit}
              disabled={isButtonDisabled}
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
    backgroundColor: colors.gray[100],
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[500],
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  button: {
    backgroundColor: colors.gray[800],
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
})
