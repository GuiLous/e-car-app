import { Redirect, Stack } from 'expo-router'

import { useCurrentAdmin } from '@/contexts'

export default function PublicLayout() {
  const { admin } = useCurrentAdmin()

  if (admin) {
    return <Redirect href="/(authenticated)/dashboard" />
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in/index"
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
    </Stack>
  )
}
