import {
  ApolloClient,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { SECURE_STORE_PREFIX } from '@/config'

import { isTokenValid } from '@/utils'

const uri = 'http://192.168.0.6:3000/graphql'

const httpLink = createHttpLink({ uri, credentials: 'include' })

const authMiddleware = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync(
    SECURE_STORE_PREFIX + 'accessToken',
  )

  if (!token) return { headers }

  if (!isTokenValid(token)) {
    await SecureStore.deleteItemAsync(SECURE_STORE_PREFIX + 'accessToken')

    router.replace('/')

    return { headers }
  }

  const cleanToken = token.replace(/['"]+/g, '')

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${cleanToken}`,
    },
  }
})

const createApolloClient = () => {
  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
}

export { createApolloClient }
