import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

import { Vehicle } from '@/domain/vehicle'

export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    const jsonValue = JSON.stringify(value)
    return await AsyncStorage.setItem(name, jsonValue)
  },
  getItem: async (name) => {
    const jsonValue = await AsyncStorage.getItem(name)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  },
  removeItem: async (name) => {
    return await AsyncStorage.removeItem(name)
  },
}

type FavoritesStore = {
  vehicles: Vehicle[]
  setVehicles: (vehicles: Vehicle[]) => void
}

export const useFavoriteStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      vehicles: [],
      setVehicles: (vehicles: Vehicle[]) =>
        set(() => ({
          vehicles,
        })),
    }),
    {
      name: 'favorite-vehicles',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
