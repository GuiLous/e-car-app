import { OrderItem } from '@/domain/order-item'

export type OrderItemsQueryResponse = {
  orderItems: OrderItem[]
}

export type CreateOrderItemMutationResponse = {
  createOrderItem: {
    orderItem: OrderItem
    errors: string[]
  }
}

export type CreateOrderItemProps = {
  payload: {
    title: string
    quantity: number
    price: string
    customerEmail: string
    customerName: string
    customerPhone: string
  }
  onSuccess?: () => void
}
