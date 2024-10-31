import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Form, Greetings } from '@/components/views'

import { colors } from '@/config'

export default function SignIn() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.gray[50],
      }}
    >
      <StatusBar backgroundColor={colors.gray[50]} style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            padding: 24,
            justifyContent: 'center',
          }}
        >
          <Greetings />

          <Form />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
