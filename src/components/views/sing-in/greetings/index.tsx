import { FC } from 'react'
import { Text, View } from 'react-native'

import { colors } from '@/config'

export const Greetings: FC = () => {
  return (
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
      <Text style={{ color: colors.gray[500] }}>Faça login para continuar</Text>
    </View>
  )
}
