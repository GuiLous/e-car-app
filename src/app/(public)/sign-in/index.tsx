import * as SecureStore from 'expo-secure-store'
import React, { useEffect } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { Form, Greetings } from '@/components/fragments'

import { colors, SECURE_STORE_PREFIX } from '@/config'

import logo from '../../../../assets/logo.png'

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
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <Image source={logo} style={{ width: 160, height: 160 }} />
        </View>

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
