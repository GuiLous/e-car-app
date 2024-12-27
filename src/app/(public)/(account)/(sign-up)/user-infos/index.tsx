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

import { Button, DateInput, Input } from '@/components/shared'

import { colors } from '@/config'

import { verifyIfAgeIsValid } from '@/utils'

export default function UserInfos() {
  const { data, setField } = useSignUpStore()

  const hasErrorOnFirstName = data.firstName === ''
  const hasErrorOnLastName = data.lastName === ''
  const isMinor = !!(data.birthDate && !verifyIfAgeIsValid(data.birthDate))
  const hasErrorOnBirthDate = data.birthDate === '' || isMinor

  const isButtonDisabled =
    hasErrorOnFirstName || hasErrorOnLastName || hasErrorOnBirthDate

  const handleNext = () => router.push('/documents')

  const handleSetFields = (field: FieldSignUp, value: any) => {
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
              Para começar, digite seus dados pessoais conforme seu documento.
            </Text>

            <View style={styles.inputsWrapper}>
              <Input
                label="Nome *"
                placeholder="Ex.: João"
                value={data.firstName}
                error={hasErrorOnFirstName}
                onChangeText={(text) => handleSetFields('firstName', text)}
              />
              <Input
                label="Sobrenome *"
                placeholder="Ex.: de Carmo Sousa"
                value={data.lastName}
                error={hasErrorOnLastName}
                onChangeText={(text) => handleSetFields('lastName', text)}
              />

              <DateInput
                label="Data de nascimento *"
                value={data.birthDate || ''}
                error={hasErrorOnBirthDate}
                errorMessage={
                  isMinor ? 'Voce precisa ser maior de idade' : undefined
                }
                onChangeText={(text) => handleSetFields('birthDate', text)}
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
