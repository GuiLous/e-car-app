import { gql, useMutation } from '@apollo/client'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message'

import { useCurrentAdmin } from '@/contexts'

import { useGetAdminFromStorage } from '@/hooks'

import {
  SignInAdminMutationResponse,
  SignInAdminProps,
} from '@/services/api/auth/types'

import { SECURE_STORE_PREFIX } from '@/config'

const SIGN_IN_ADMIN_MUTATION = gql`
  mutation SignInAdmin($input: SignInAdminInput!) {
    signInAdmin(input: $input) {
      token
      errors
    }
  }
`

export const useSignInMutation = () => {
  const { setAdmin } = useCurrentAdmin()
  const { getAdminFromStorage } = useGetAdminFromStorage()

  const [mutate, { loading, error, data }] =
    useMutation<SignInAdminMutationResponse>(SIGN_IN_ADMIN_MUTATION)

  const signInMutation = ({ payload, onError }: SignInAdminProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ signInAdmin }) => {
        if (signInAdmin.errors.length > 0) {
          if (onError) onError()

          return signInAdmin.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        const { token } = signInAdmin

        await SecureStore.setItemAsync(
          SECURE_STORE_PREFIX + 'accessToken',
          JSON.stringify(token),
        )

        const admin = getAdminFromStorage(token)

        setAdmin(admin)

        const role = admin?.role

        console.log('🚀 - role 2:', role)

        if (role === 'member')
          return router.push('/(authenticated)/(member)/dashboard')

        if (role === 'director')
          return router.push('/(authenticated)/(director)/dashboard')

        return router.push('/(authenticated)/(master)/dashboard')
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
