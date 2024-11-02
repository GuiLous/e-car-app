import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native'

import { Form, Greetings } from '@/components/fragments'

import { colors } from '@/config'

export default function SignIn() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View> */}

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
