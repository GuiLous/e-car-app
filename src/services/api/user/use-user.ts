import { gql, useMutation } from '@apollo/client'
import Toast from 'react-native-toast-message'

import { SignUpMutationResponse, SignUpProps } from '@/services/api/user/types'

const SIGN_UP_MUTATION = gql`
  mutation (
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
  ) {
    signUp(
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
      firstName: $firstName
      lastName: $lastName
      phone: $phone
    ) {
      token
    }
  }
`

export const useSignUpMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<SignUpMutationResponse>(SIGN_UP_MUTATION)

  const signUpMutation = ({ payload, onSuccess }: SignUpProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ signUp }) => {
        if (signUp.errors.length > 0) {
          return signUp.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        Toast.show({
          text1: 'Usuário cadastrado com sucesso!',
          type: 'success',
        })

        if (onSuccess) onSuccess()
      },
      onError: () => {
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao cadastrar o usuário!',
          type: 'error',
        })
      },
    })
  }

  return { signUpMutation, loading, error, data }
}
