import { router } from 'expo-router'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { FieldSignUp, useSignUpStore } from '@/stores'

import { Button, Input } from '@/components/shared'

import { colors } from '@/config'

import { applyInputMask, isValidCellphone, isValidEmail } from '@/utils'

export default function Contact() {
  const { data, setField } = useSignUpStore()

  const hasErrorOnEmail =
    data.email === '' || !!(data.email && !isValidEmail(data.email))

  const hasErrorOnPhone =
    data.phone === '' || !!(data.phone && !isValidCellphone(data.phone))

  const isButtonDisabled =
    hasErrorOnEmail || hasErrorOnPhone || !data.email || !data.phone

  const handleNext = () => router.push('/success')

  const handleSetFields = (field: FieldSignUp, value: any) => {
    if (field === 'phone' && value.length > 11) return

    setField(field, value)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>
              Quase lá, precisamos de alguns dados para entrarmos em contato.
            </Text>

            <View style={styles.inputsWrapper}>
              <Input
                label="Email *"
                placeholder="Ex.: email@example.com"
                value={data.email}
                error={hasErrorOnEmail}
                inputMode="email"
                onChangeText={(text) => handleSetFields('email', text)}
              />
              <Input
                label="Telefone *"
                placeholder="Ex.: (99)99999-9999"
                value={applyInputMask(data.phone || '', 'phone')}
                error={hasErrorOnPhone}
                inputMode="tel"
                onChangeText={(text) =>
                  handleSetFields('phone', text.replace(/\D/g, ''))
                }
              />
            </View>
          </View>

          <Button
            title="Avançar"
            disabled={isButtonDisabled}
            onPress={handleNext}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 32,
  },
  wrapper: {
    flex: 1,
    gap: 62,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.gray[500],
  },
  inputsWrapper: {
    flex: 1,
    gap: 22,
  },
})
