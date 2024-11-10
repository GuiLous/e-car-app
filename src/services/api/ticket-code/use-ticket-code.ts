import { gql, useMutation, useQuery } from '@apollo/client'
import Toast from 'react-native-toast-message'

import {
  DeleteTicketCodeMutationResponse,
  DeleteTicketCodeProps,
  ListTicketCodesQueryResponse,
  UpdateTicketUsedMutationResponse,
  UpdateTicketUsedProps,
} from '@/services/api/ticket-code/types'

const UPDATE_TICKET_USED_MUTATION = gql`
  mutation UpdateTicketUsed($input: UpdateTicketUsedInput!) {
    updateTicketUsed(input: $input) {
      updatedId
      errors
    }
  }
`

const DELETE_TICKET_CODE_MUTATION = gql`
  mutation DeleteTicketCode($input: DeleteTicketCodeInput!) {
    deleteTicketCode(input: $input) {
      deletedId
      errors
    }
  }
`

const LIST_TICKET_CODES_QUERY = gql`
  query TicketCodes {
    ticketCodes {
      id
      uuid
      shopifyOrderItem {
        customerEmail
        customerName
        customerPhone
        id
        price
        quantity
        title
        manual
      }
      used
      usedAt
    }
  }
`

export const useUpdateTicketUsedMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<UpdateTicketUsedMutationResponse>(UPDATE_TICKET_USED_MUTATION)

  const updateTicketUsedMutation = ({
    payload,
    onSuccess,
    onError,
  }: UpdateTicketUsedProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ updateTicketUsed }) => {
        if (updateTicketUsed.errors.length > 0) {
          if (onError) onError()

          return updateTicketUsed.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        Toast.show({
          text1: 'Tudo certo!',
          type: 'success',
          visibilityTime: 3500,
        })

        if (onSuccess) return onSuccess()
      },
      onError: () => {
        if (onError) onError()
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao verificar o ingresso!',
          type: 'error',
        })
      },
      refetchQueries: ['TicketCodes'],
    })
  }

  return { updateTicketUsedMutation, loading, error, data }
}

export const useDeleteTicketCodeMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<DeleteTicketCodeMutationResponse>(DELETE_TICKET_CODE_MUTATION)

  const deleteTicketCodeMutation = ({
    payload,
    onSuccess,
    onError,
  }: DeleteTicketCodeProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ deleteTicketCode }) => {
        if (deleteTicketCode.errors.length > 0) {
          if (onError) onError()

          return deleteTicketCode.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        Toast.show({
          text1: 'Pedido deletado com sucesso!',
          type: 'success',
          visibilityTime: 3500,
        })

        if (onSuccess) return onSuccess()
      },
      onError: () => {
        if (onError) onError()
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao deletar o pedido!',
          type: 'error',
        })
      },
      refetchQueries: ['TicketCodes'],
    })
  }

  return { deleteTicketCodeMutation, loading, error, data }
}

export const useListTicketCodes = () => {
  const { data, loading, error, refetch } =
    useQuery<ListTicketCodesQueryResponse>(LIST_TICKET_CODES_QUERY, {
      fetchPolicy: 'network-only',
      pollInterval: 10000,
    })

  return { data, loading, error, refetch }
}
