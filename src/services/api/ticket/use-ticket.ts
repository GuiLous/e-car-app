import { gql, useMutation, useQuery } from '@apollo/client'
import Toast from 'react-native-toast-message'

import {
  CreateTicketMutationResponse,
  CreateTicketProps,
  DeleteTicketMutationResponse,
  DeleteTicketProps,
  ListTicketsQueryResponse,
} from '@/services/api/ticket/types'

const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      ticket {
        id
        name
        description
        city
        date
        footerDescription
        location
      }
      errors
    }
  }
`
const LIST_TICKETS_QUERY = gql`
  query ListTickets {
    tickets {
      id
      name
      description
      city
      date
      footerDescription
      location
    }
  }
`

const DELETE_TICKET_MUTATION = gql`
  mutation DeleteTicket($input: DeleteTicketInput!) {
    deleteTicket(input: $input) {
      deletedId
      errors
    }
  }
`

export const useListTickets = () => {
  const { data, loading, error, refetch } = useQuery<ListTicketsQueryResponse>(
    LIST_TICKETS_QUERY,
    {
      fetchPolicy: 'network-only',
    },
  )

  return { data, loading, error, refetch }
}

export const useCreateTicketMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<CreateTicketMutationResponse>(CREATE_TICKET_MUTATION)

  const createTicketMutation = ({ payload, onSuccess }: CreateTicketProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ createTicket }) => {
        if (createTicket.errors.length > 0) {
          return createTicket.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        Toast.show({
          text1: 'Ingresso cadastrado com sucesso!',
          type: 'success',
        })

        if (onSuccess) onSuccess()
      },
      onError: () => {
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao cadastrar o ingresso!',
          type: 'error',
        })
      },
      refetchQueries: ['ListTickets'],
    })
  }

  return { createTicketMutation, loading, error, data }
}

export const useDeleteTicketMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<DeleteTicketMutationResponse>(DELETE_TICKET_MUTATION)

  const deleteTicketMutation = ({ payload }: DeleteTicketProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ deleteTicket }) => {
        if (deleteTicket.errors.length > 0) {
          return deleteTicket.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        Toast.show({
          text1: 'Ingresso deletado com sucesso!',
          type: 'success',
        })
      },
      onError: () => {
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao deletar o ingresso!',
          type: 'error',
        })
      },
      refetchQueries: ['ListTickets'],
    })
  }

  return { deleteTicketMutation, loading, error, data }
}
