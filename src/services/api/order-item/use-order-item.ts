import { gql, useMutation, useQuery } from '@apollo/client'
import Toast from 'react-native-toast-message'

import {
  CreateOrderItemMutationResponse,
  CreateOrderItemProps,
  OrderItemsQueryResponse,
} from '@/services/api/order-item/types'

const LIST_ORDER_ITEMS_QUERY = gql`
  query OrderItems {
    orderItems {
      id
      title
      price
      quantity
      customerEmail
      customerName
      customerPhone
      ticketCode {
        used
        usedAt
      }
    }
  }
`
const CREATE_ORDER_ITEM_MUTATION = gql`
  mutation CreateOrderItem($input: CreateOrderItemInput!) {
    createOrderItem(input: $input) {
      orderItem {
        id
        title
        price
        quantity
        customerEmail
        customerName
        customerPhone
      }
      errors
    }
  }
`

export const useListOrderItems = () => {
  const { data, loading, error, refetch } = useQuery<OrderItemsQueryResponse>(
    LIST_ORDER_ITEMS_QUERY,
    {
      fetchPolicy: 'network-only',
      pollInterval: 10000,
    },
  )

  return { data, loading, error, refetch }
}

export const useCreateOrderItemMutation = () => {
  const [mutate, { loading, error, data }] =
    useMutation<CreateOrderItemMutationResponse>(CREATE_ORDER_ITEM_MUTATION)

  const createOrderItemMutation = ({
    payload,
    onSuccess,
  }: CreateOrderItemProps) => {
    mutate({
      variables: { input: payload },
      onCompleted: async ({ createOrderItem }) => {
        if (createOrderItem.errors.length > 0) {
          return createOrderItem.errors.forEach((error) => {
            Toast.show({
              text1: error,
              type: 'error',
            })
          })
        }

        Toast.show({
          text1: 'Pedido cadastrado com sucesso!',
          type: 'success',
        })

        if (onSuccess) onSuccess()
      },
      onError: () => {
        Toast.show({
          text1: 'Ocorreu um erro desconhecido ao cadastrar o pedido!',
          type: 'error',
        })
      },
      refetchQueries: ['TicketCodes'],
    })
  }

  return { createOrderItemMutation, loading, error, data }
}
