import { Redirect } from 'expo-router'

import { useCurrentUser } from '@/contexts'

export default function Home() {
  const { user } = useCurrentUser()

  if (user) {
    return <Redirect href="/(authenticated)/dashboard" />
  }

  return <Redirect href="/(public)/sign-in" />
}
