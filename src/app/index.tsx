import { Redirect } from 'expo-router'

import { useCurrentAdmin } from '@/contexts'

export default function Home() {
  const { admin } = useCurrentAdmin()

  if (admin) {
    return <Redirect href="/(authenticated)/dashboard" />
  }

  return <Redirect href="/(public)/sign-in" />
}
