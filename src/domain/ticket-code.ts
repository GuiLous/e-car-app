import { OrderItem } from '@/domain/order-item'

export type TicketCode = {
  id: number
  uuid: string
  shopifyOrderItem: OrderItem
  used: boolean
  usedAt: string
}
