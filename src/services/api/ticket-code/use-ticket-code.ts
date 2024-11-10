import { gql, useMutation, useQuery } from '@apollo/client'
import Toast from 'react-native-toast-message'

import {
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

export const useListTicketCodes = () => {
  const { data, loading, error, refetch } =
    useQuery<ListTicketCodesQueryResponse>(LIST_TICKET_CODES_QUERY, {
      fetchPolicy: 'network-only',
      pollInterval: 10000,
    })

  return { data, loading, error, refetch }
}
