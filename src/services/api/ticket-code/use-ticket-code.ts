import { gql, useMutation } from '@apollo/client'
import Toast from 'react-native-toast-message'

import {
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
      refetchQueries: ['OrderItems'],
    })
  }

  return { updateTicketUsedMutation, loading, error, data }
}
