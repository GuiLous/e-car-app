import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/shared'

import { colors } from '@/config'

export default function Success() {
  const handleGoBackToSignIn = () => router.replace('/sign-in')

  return (
    <View style={styles.container}>
      <View style={styles.messageWrapper}>
        <View style={styles.iconContainer}>
          <FontAwesome
            name="check-circle"
            size={100}
            color={colors.gray[900]}
          />
        </View>
        <Text style={styles.successMessage}>
          Sua conta foi criada com sucesso! Você já pode fazer login na sua
          conta.
        </Text>
      </View>
      <View style={{ width: '100%' }}>
        <Button title="Voltar para o login" onPress={handleGoBackToSignIn} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
    padding: 24,
    justifyContent: 'space-between',
  },
  messageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 30,
  },
})
