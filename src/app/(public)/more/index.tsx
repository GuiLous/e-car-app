import { StyleSheet, Text, View } from 'react-native'

import { colors } from '@/config'

export default function More() {
  return (
    <View style={styles.container}>
      <Text>More</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
})
