import { Ticket } from '@/domain'

export type CreateTicketMutationResponse = {
  createTicket: {
    ticket: Ticket
    errors: string[]
  }
}

export type CreateTicketProps = {
  payload: {
    name: string
    description: string
    city: string
    date: Date
    footerDescription: string
    location: string
  }
  onSuccess?: () => void
}

export type ListTicketsQueryResponse = {
  tickets: Ticket[]
  errors: string[]
}

export type DeleteTicketMutationResponse = {
  deleteTicket: {
    deleted_id: number
    errors: string[]
  }
}

export type DeleteTicketProps = {
  payload: {
    id: number
  }
}
