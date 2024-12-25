export type SignInUserMutationResponse = {
  signIn: {
    token: string
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
