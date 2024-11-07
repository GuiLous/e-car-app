import * as SecureStore from 'expo-secure-store'
import React, { useEffect } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native'

import { Form, Greetings } from '@/components/fragments'

import { colors, SECURE_STORE_PREFIX } from '@/config'

export default function SignIn() {
  useEffect(() => {
    SecureStore.deleteItemAsync(SECURE_STORE_PREFIX + 'accessToken')
  }, [])

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
        <Greetings />

        <Form />
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
})
