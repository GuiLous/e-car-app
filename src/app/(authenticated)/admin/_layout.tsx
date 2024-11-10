import { Stack } from 'expo-router'

import { colors } from '@/config'

export default function DashboardLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.gray[700],
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="create-admin"
          options={{
            headerTitle: '',
            headerBackTitle: 'Voltar',
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  )
}
