import { Stack } from 'expo-router'

import { colors } from '@/config'

export default function SignUpLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.black,
        },
        headerTitleAlign: 'center',
        headerTintColor: colors.white,
        headerShown: true,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="sign-in/index"
        options={{
          title: 'Login',
          headerShown: false,
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="(sign-up)/user-infos/index"
        options={{
          title: 'Cadastro',
          headerBackTitle: 'Login',
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="(sign-up)/documents/index"
        options={{
          title: 'Cadastro',
          headerBackTitle: 'Voltar',
          headerBackVisible: true,
        }}
      />
    </Stack>
  )
}
