import { TicketCode } from '@/domain'

export type UpdateTicketUsedMutationResponse = {
  updateTicketUsed: {
    updatedId: number
    errors: string[]
  }
}

export type UpdateTicketUsedProps = {
  payload: {
    uuid: string
  }
  onSuccess?: () => void
  onError?: () => void
}

export type ListTicketCodesQueryResponse = {
  ticketCodes: TicketCode[]
}

export type DeleteTicketCodeMutationResponse = {
  deleteTicketCode: {
    deletedId: number
    errors: string[]
  }
}

export type DeleteTicketCodeProps = {
  payload: {
    id: number
  }
  onSuccess?: () => void
  onError?: () => void
}
