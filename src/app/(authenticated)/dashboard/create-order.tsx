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

import { useCreateOrderItemMutation } from '@/services/api'

import { Button, Input } from '@/components/shared'

import { colors } from '@/config'

type OrderData = {
  title: string
  quantity: number
  price: string
  customerEmail: string
  customerName: string
  customerPhone: string
}

export default function CreateOrder() {
  const { createOrderItemMutation } = useCreateOrderItemMutation()

  const [formData, setFormData] = useState<OrderData>({
    title: '',
    quantity: 1,
    price: '',
    customerEmail: '',
    customerName: '',
    customerPhone: '',
  })

  const hasErrorOnTitle = !formData.title
  const hasErrorOnQuantity = !formData.quantity
  const hasErrorOnPrice = !formData.price
  const hasErrorOnEmail = !formData.customerEmail
  const hasErrorOnName = !formData.customerName

  const disableSubmitButton =
    hasErrorOnTitle ||
    hasErrorOnQuantity ||
    hasErrorOnPrice ||
    hasErrorOnEmail ||
    hasErrorOnName

  const resetForm = () => {
    setFormData({
      title: '',
      quantity: 1,
      price: '',
      customerEmail: '',
      customerName: '',
      customerPhone: '',
    })
  }

  const handleSubmit = () => {
    createOrderItemMutation({
      payload: { ...formData, price: formData.price.replace(',', '.') },
      onSuccess: resetForm,
    })
  }

  const handleChange = (field: keyof OrderData, value: string) => {
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
          <Text style={styles.title}>Registrar Pedido</Text>

          <View style={styles.form}>
            <Input
              label="Título *"
              value={formData.title}
              onChangeText={(value) => handleChange('title', value)}
              placeholder="Nome do evento"
            />

            <Input
              label="Quantidade *"
              value={formData.quantity.toString()}
              onChangeText={(value) => handleChange('quantity', value)}
              keyboardType="numeric"
            />

            <Input
              label="Preço *"
              value={formData.price}
              onChangeText={(value) => handleChange('price', value)}
              keyboardType="numeric"
              placeholder="0,00"
            />

            <Input
              label="Email do Cliente *"
              value={formData.customerEmail}
              onChangeText={(value) => handleChange('customerEmail', value)}
              keyboardType="email-address"
            />

            <Input
              label="Nome do Cliente *"
              value={formData.customerName}
              onChangeText={(value) => handleChange('customerName', value)}
            />

            <Input
              label="Telefone do Cliente"
              value={formData.customerPhone}
              onChangeText={(value) => handleChange('customerPhone', value)}
              keyboardType="phone-pad"
              placeholder="Apenas números"
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
