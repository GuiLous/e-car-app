import { ActivityIndicator, View } from 'react-native'

import { colors } from '@/config'

export function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.gray[600]} />
    </View>
  )
}
