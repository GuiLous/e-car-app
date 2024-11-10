export type Admin = {
  id: number
  email: string
  first_name: string
  last_name: string
  phone_number: string
  role: AdminRole
}

export type AdminRole = 'master' | 'director' | 'member'
