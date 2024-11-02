import { StyleSheet, Text, View } from 'react-native'

import { colors } from '@/config'

export default function Tickets() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tickets</Text>
      {/* Seu conteúdo aqui */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 16,
  },
})
