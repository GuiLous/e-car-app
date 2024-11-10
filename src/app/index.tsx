import { Redirect } from 'expo-router'

import { useCurrentAdmin } from '@/contexts'

export default function Home() {
  const { admin } = useCurrentAdmin()
  console.log('🚀 - admin:', admin)

  if (admin) {
    const role = admin.role
    console.log('🚀 - role 1:', role)

    if (role === 'member')
      return <Redirect href="/(authenticated)/(member)/dashboard" />
    if (role === 'director')
      return <Redirect href="/(authenticated)/(director)/dashboard" />

    return <Redirect href="/(authenticated)/(master)/dashboard" />
  }

  return <Redirect href="/(public)/sign-in" />
}
