import { Admin, AdminRole } from '@/domain'

export type ListAdminsQueryResponse = {
  admins: Admin[]
}

export type DeleteAdminMutationResponse = {
  deleteAdmin: {
    deletedId: string
    errors: string[]
  }
}

export type CreateAdminMutationResponse = {
  createAdmin: {
    admin: Admin
    errors: string[]
  }
}

export type CreateAdminProps = {
  payload: {
    email: string
    firstName: string
    lastName: string
    password: string
    passwordConfirmation: string
    phoneNumber: string
    role: AdminRole
  }
  onSuccess?: () => void
}
