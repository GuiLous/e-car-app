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
