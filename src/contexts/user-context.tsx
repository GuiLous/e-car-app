import { ReactNode, createContext, useContext, useState } from 'react'

import { User } from '@/domain'

type UserContextValue = {
  user: User | null
  setUser: (value: User | null) => void
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(UserContext)
