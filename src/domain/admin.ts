export type Admin = {
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: AdminRole
}

export type AdminRole = 'master' | 'director' | 'member'
