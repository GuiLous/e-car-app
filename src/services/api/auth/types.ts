export type SignInAdminMutationResponse = {
  signInAdmin: {
    token: string
    errors: string[]
  }
}

export type SignInAdminProps = {
  payload: {
    email: string
    password: string
  }
}
