import {
  ApolloClient,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const uri = 'http://10.0.0.2:3000/graphql'

const httpLink = createHttpLink({ uri })

const authMiddleware = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  }
})

const createApolloClient = () => {
  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  })
}

export { createApolloClient }
