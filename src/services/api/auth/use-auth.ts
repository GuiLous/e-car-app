import { gql, useMutation } from '@apollo/client'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message'

import { useCurrentUser } from '@/contexts'

import { useGetUserFromStorage } from '@/hooks'

import {
  SignInUserMutationResponse,
  SignInUserProps,
} from '@/services/api/auth/types'

import { SECURE_STORE_PREFIX } from '@/config'

const SIGN_IN_USER_MUTATION = gql`
  mutation SignIn($input: SignInUserInput!) {
    signIn(input: $input) {
      token
      errors
    }
  }
`

export const useSignInMutation = () => {
  const { setUser } = useCurrentUser()
  const { getUserFromStorage } = useGetUserFromStorage()

  const [mutate, { loading, error, data }] =
    useMutation<SignInUserMutationResponse>(SIGN_IN_USER_MUTATION)

  const signInMutation = ({ payload, onError }: SignInUserProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ signIn }) => {
        if (signIn.errors.length > 0) {
          if (onError) onError()

          return signIn.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        const { token } = signIn

        await SecureStore.setItemAsync(
          SECURE_STORE_PREFIX + 'accessToken',
          JSON.stringify(token),
        )

        const user = getUserFromStorage(token)

        setUser(user)

        router.push('/(authenticated)/dashboard')
      },
      onError: () => {
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao realizar o login!',
          type: 'error',
        })
      },
    })
  }

  return { signInMutation, loading, error, data }
}
