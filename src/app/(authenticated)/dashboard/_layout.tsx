import { Stack } from 'expo-router'

import { colors } from '@/config'

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
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
        name="create-order"
        options={{
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  )
}
