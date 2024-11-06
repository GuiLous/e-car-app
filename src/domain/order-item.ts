import { TicketCode } from '@/domain'

export type OrderItem = {
  id: number
  title: string
  price: number
  quantity: number
  customerEmail: string
  customerName: string
  customerPhone?: string
  ticketCode?: TicketCode
}
