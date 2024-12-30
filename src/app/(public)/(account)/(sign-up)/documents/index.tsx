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

import { applyInputMask, isValidCPF } from '@/utils'

export default function Documents() {
  const { data, setField } = useSignUpStore()

  const hasErrorOnRg = data.rg === ''
  const hasErrorOnCpf =
    data.cpf === '' ||
    !!(data.cpf && data.cpf.length < 11) ||
    !!(data.cpf && !isValidCPF(data.cpf))

  const isButtonDisabled =
    hasErrorOnRg || hasErrorOnCpf || !data.rg || !data.cpf

  const handleSetFields = (field: FieldSignUp, value: any) => {
    if (field === 'cpf' && value.length > 11) return

    setField(field, value)
  }

  const handleNext = () => router.push('/documents-photo')

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
              Informe os dados dos seus documentos.
            </Text>

            <View style={styles.inputsWrapper}>
              <Input
                label="RG *"
                placeholder=""
                value={data.rg}
                error={hasErrorOnRg}
                onChangeText={(text) =>
                  handleSetFields('rg', text.replace(/\D/g, ''))
                }
              />
              <Input
                label="CPF *"
                placeholder=""
                value={applyInputMask(data.cpf || '', 'cpf')}
                error={hasErrorOnCpf}
                onChangeText={(text) =>
                  handleSetFields('cpf', text.replace(/\D/g, ''))
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
