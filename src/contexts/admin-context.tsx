import { ReactNode, createContext, useContext, useState } from 'react'

import { Admin } from '@/domain'

type AdminContextValue = {
  admin: Admin | null
  setAdmin: (value: Admin | null) => void
}

const AdminContext = createContext<AdminContextValue>({} as AdminContextValue)

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useCurrentAdmin = () => useContext(AdminContext)
