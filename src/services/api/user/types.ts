import { User } from '@/domain'

export type SignUpMutationResponse = {
  signUp: {
    admin: User
    errors: string[]
  }
}

export type SignUpProps = {
  payload: {
    email: string
    firstName: string
    lastName: string
    password: string
    passwordConfirmation: string
    phone: string
  }
  onSuccess?: () => void
}
