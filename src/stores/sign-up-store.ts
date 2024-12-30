import { create } from 'zustand'

type SignUpData = {
  firstName: string
  lastName: string
  birthDate: string
  cpf: string
  rg: string
  documentFrontPhoto: string
  documentBackPhoto: string
  city: string
  complement: string
  formattedAddress: string
  latitude: number
  longitude: number
  neighborhood: string
  number: string
  postalCode: string
  state: string
  street: string
  email: string
  phone: string
}

export type FieldSignUp = keyof SignUpData

type SignUpStore = {
  data: Partial<SignUpData>
  setField: (field: FieldSignUp, value: any) => void
  resetSignUpData: () => void
}

export const useSignUpStore = create<SignUpStore>((set) => ({
  data: {},
  setField: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [field]: value,
      },
    })),
  resetSignUpData: () => set({ data: {} }),
}))
