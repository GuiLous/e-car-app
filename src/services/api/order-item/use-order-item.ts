import { gql, useQuery } from '@apollo/client'

import { OrderItemsQueryResponse } from '@/services/api/order-item/types'

const ORDER_ITEMS_QUERY = gql`
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

export const useListOrderItems = () => {
  const { data, loading, error, refetch } = useQuery<OrderItemsQueryResponse>(
    ORDER_ITEMS_QUERY,
    {
      fetchPolicy: 'network-only',
      pollInterval: 10000,
    },
  )

  return { data, loading, error, refetch }
}
