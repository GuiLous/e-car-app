import React from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '@/config'

export default function Home() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
})
