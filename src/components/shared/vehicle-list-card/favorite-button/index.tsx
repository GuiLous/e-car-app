import { FontAwesome } from '@expo/vector-icons'
import { useCallback } from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { useFavoriteStore } from '@/stores'

import { Vehicle } from '@/domain/vehicle'

import { colors } from '@/config'

const isIos = Platform.OS === 'ios'

type FavoriteButtonProps = {
  item: any
}

export function FavoriteButton({ item }: FavoriteButtonProps) {
  const { setVehicles, vehicles } = useFavoriteStore()

  const verifyIfIsInFavoritesList = useCallback(
    (id: number) => {
      return vehicles.some((vehicle) => vehicle.id === id)
    },
    [vehicles],
  )

  const handleAddOrRemoveFromFavorites = (item: Vehicle) => {
    if (verifyIfIsInFavoritesList(item.id)) {
      return setVehicles(vehicles.filter((vehicle) => vehicle.id !== item.id))
    }

    setVehicles([...vehicles, item])
  }

  return (
    <TouchableOpacity
      style={[
        styles.favoriteButtonWrapper,
        verifyIfIsInFavoritesList(item.id) && styles.favorite,
      ]}
      onPress={() => handleAddOrRemoveFromFavorites(item as unknown as Vehicle)}
    >
      <FontAwesome
        name={verifyIfIsInFavoritesList(item.id) ? 'heart' : 'heart-o'}
        size={16}
        color={
          verifyIfIsInFavoritesList(item.id) ? colors.white : colors.blue[500]
        }
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  favoriteButtonWrapper: {
    position: 'absolute',
    top: RFValue(isIos ? 14 : 6),
    right: RFValue(isIos ? 28 : 20),
    backgroundColor: colors.white,
    opacity: 0.8,
    borderRadius: 99999,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favorite: {
    backgroundColor: colors.blue[500],
  },
})
