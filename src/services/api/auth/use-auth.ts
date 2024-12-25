import { gql, useMutation } from '@apollo/client'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message'

import { useCurrentUser } from '@/contexts'

import {
  SignInUserMutationResponse,
  SignInUserProps,
} from '@/services/api/auth/types'

import { SECURE_STORE_PREFIX } from '@/config'
import {
  EXCEPTIONS_MESSAGES,
  EXCEPTIONS_MESSAGES_KEYS,
  EXCEPTIONS_MESSAGES_KEYS_TYPE,
} from '@/config/exceptions'

const SIGN_IN_USER_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
        phone
      }
    }
  }
`

export const useSignInMutation = () => {
  const { setUser } = useCurrentUser()

  const [mutate, { loading, error, data }] =
    useMutation<SignInUserMutationResponse>(SIGN_IN_USER_MUTATION)

  const signInMutation = ({ payload, onError }: SignInUserProps) => {
    mutate({
      variables: payload,
      onCompleted: async ({ signIn }) => {
        const { token } = signIn

        await SecureStore.setItemAsync(
          SECURE_STORE_PREFIX + 'accessToken',
          JSON.stringify(token),
        )

        setUser(signIn.user)

        router.push('/')
      },
      onError: (error) => {
        if (EXCEPTIONS_MESSAGES_KEYS.includes(error.message)) {
          if (onError) onError()

          return Toast.show({
            text1:
              EXCEPTIONS_MESSAGES[
                error.message as EXCEPTIONS_MESSAGES_KEYS_TYPE
              ],
            type: 'error',
          })
        }

        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao realizar o login!',
          type: 'error',
        })
      },
    })
  }

  return { signInMutation, loading, error, data }
}
