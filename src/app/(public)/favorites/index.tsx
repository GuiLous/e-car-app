import { useCallback } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useFavoriteStore } from '@/stores'

import { VehicleListCard } from '@/components/shared'

import { colors } from '@/config'

export default function Favorites() {
  const { setVehicles, vehicles } = useFavoriteStore()

  const verifyIfIsInFavoritesList = useCallback(
    (id: number) => {
      return vehicles.some((vehicle) => vehicle.id === id)
    },
    [vehicles],
  )

  const handleRemoveFromFavorites = (id: number) => {
    if (verifyIfIsInFavoritesList(id)) {
      return setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <VehicleListCard
            item={item}
            showFavoriteButton={false}
            onPressRemoveFavorite={handleRemoveFromFavorites}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto favoritado!</Text>
          </View>
        )}
        contentContainerStyle={
          vehicles.length === 0 && styles.emptyListContentContainer
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.gray[600],
    textAlign: 'center',
    fontSize: 16,
  },
  emptyListContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})
