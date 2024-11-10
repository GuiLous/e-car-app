import { gql, useMutation, useQuery } from '@apollo/client'
import Toast from 'react-native-toast-message'

import {
  CreateAdminMutationResponse,
  CreateAdminProps,
  DeleteAdminMutationResponse,
  ListAdminsQueryResponse,
} from '@/services/api/admin/types'
import { DeleteTicketCodeProps } from '@/services/api/ticket-code'

const DELETE_ADMIN_MUTATION = gql`
  mutation DeleteAdmin($input: DeleteAdminInput!) {
    deleteAdmin(input: $input) {
      deletedId
      errors
    }
  }
`

const LIST_ADMINS_QUERY = gql`
  query Admins {
    admins {
      email
      firstName
      lastName
      id
      phoneNumber
      role
    }
  }
`

const CREATE_ADMIN_MUTATION = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
      admin {
        id
        email
        phoneNumber
        firstName
        lastName
        role
      }
      errors
    }
  }
`

export const useCreateAdminMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<CreateAdminMutationResponse>(CREATE_ADMIN_MUTATION)

  const createAdminMutation = ({ payload, onSuccess }: CreateAdminProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ createAdmin }) => {
        if (createAdmin.errors.length > 0) {
          return createAdmin.errors.forEach((error) => {
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
      refetchQueries: ['Admins'],
    })
  }

  return { createAdminMutation, loading, error, data }
}

export const useDeleteAdminMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<DeleteAdminMutationResponse>(DELETE_ADMIN_MUTATION)

  const deleteAdminMutation = ({
    payload,
    onSuccess,
    onError,
  }: DeleteTicketCodeProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ deleteAdmin }) => {
        if (deleteAdmin.errors.length > 0) {
          if (onError) onError()

          return deleteAdmin.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        Toast.show({
          text1: 'Usuário deletado com sucesso!',
          type: 'success',
          visibilityTime: 3500,
        })

        if (onSuccess) return onSuccess()
      },
      onError: () => {
        if (onError) onError()
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao deletar o usuário!',
          type: 'error',
        })
      },
      refetchQueries: ['Admins'],
    })
  }

  return { deleteAdminMutation, loading, error, data }
}

export const useListAdmins = () => {
  const { data, loading, error, refetch } = useQuery<ListAdminsQueryResponse>(
    LIST_ADMINS_QUERY,
    {
      fetchPolicy: 'network-only',
    },
  )

  return { data, loading, error, refetch }
}
