import { Redirect, Stack } from 'expo-router'

import { useCurrentUser } from '@/contexts'

export default function PublicLayout() {
  const { user } = useCurrentUser()

  if (user) {
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
