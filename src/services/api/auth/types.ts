import { User } from '@/domain'

export type SignInUserMutationResponse = {
  signIn: {
    token: string
    user: User
    errors: string[]
  }
}

export type SignInUserProps = {
  payload: {
    email: string
    password: string
  }
  onError?: () => void
}
