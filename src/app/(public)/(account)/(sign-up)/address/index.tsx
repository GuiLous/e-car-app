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
import { Select } from '@/components/shared/select'

import { colors } from '@/config'

import { States } from '@/utils/states'

export default function Address() {
  const { data, setField } = useSignUpStore()

  const hasErrorOnStreet = data.street === ''
  const hasErrorOnNeighborhood = data.neighborhood === ''
  const hasErrorOnPostalCode = data.postalCode === ''
  const hasErrorOnCity = data.city === ''
  const hasErrorOnState = data.state === ''
  const hasErrorOnNumber = data.state === ''

  const isButtonDisabled =
    hasErrorOnStreet ||
    hasErrorOnNeighborhood ||
    hasErrorOnPostalCode ||
    hasErrorOnCity ||
    hasErrorOnState ||
    hasErrorOnNumber ||
    !data.street ||
    !data.neighborhood ||
    !data.postalCode ||
    !data.city ||
    !data.state ||
    !data.number

  const handleNext = () => router.push('/contact')

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
              Agora, informe seu endereço atual, usaremos essa informação para
              encontrar sua residência.
            </Text>

            <View style={styles.inputsWrapper}>
              <Input
                label="Cep *"
                placeholder="Ex.: 00000-000"
                value={data.postalCode}
                error={hasErrorOnPostalCode}
                onChangeText={(text) => handleSetFields('postalCode', text)}
              />
              <Input
                label="Bairro *"
                placeholder="Ex.: Centro"
                value={data.neighborhood}
                error={hasErrorOnNeighborhood}
                onChangeText={(text) => handleSetFields('neighborhood', text)}
              />
              <Input
                label="Rua *"
                placeholder="Ex.: 7 de Setembro"
                value={data.street}
                error={hasErrorOnStreet}
                onChangeText={(text) => handleSetFields('street', text)}
              />

              <Input
                label="Número *"
                placeholder="Ex.: 76 ou S/N"
                value={data.number}
                error={hasErrorOnNumber}
                onChangeText={(text) => handleSetFields('number', text)}
              />

              <Input
                label="Cidade *"
                placeholder="Ex.: São Paulo"
                value={data.city}
                error={hasErrorOnCity}
                onChangeText={(text) => handleSetFields('city', text)}
              />

              <Input
                label="Complemento"
                placeholder=""
                value={data.complement}
                onChangeText={(text) => handleSetFields('complement', text)}
              />

              <Select
                label="Estado *"
                value={data.state || ''}
                options={States}
                onValueChange={(value: string) =>
                  handleSetFields('state', value)
                }
                placeholder="Selecione um estado"
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
