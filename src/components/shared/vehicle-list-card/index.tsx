import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { colors } from '@/config'

import { formatAmountToBRL } from '@/utils'

import { FavoriteButton } from './favorite-button'

const isIos = Platform.OS === 'ios'

type VehicleListCardProps = {
  item: any
  showFavoriteButton?: boolean
  onPressRemoveFavorite?: (id: number) => void
}

export function VehicleListCard({
  item,
  showFavoriteButton = true,
  onPressRemoveFavorite,
}: VehicleListCardProps) {
  return (
    <TouchableOpacity style={styles.vehicleCard}>
      <View style={styles.vehicleImageWrapper}>
        <Image source={{ uri: item.imageUrl }} style={styles.vehicleImage} />
        {showFavoriteButton && <FavoriteButton item={item} />}
      </View>
      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleBadge}>
          <Text style={styles.vehicleBadgeText}>Carro verificado</Text>
        </View>
        <Text style={styles.verifiedInfo}>Placa e chassi verificados</Text>
        <Text style={styles.vehicleTitle}>{item.title}</Text>
        <Text style={styles.vehiclePrice}>{formatAmountToBRL(item.price)}</Text>
        <Text style={styles.vehicleYear}>2020 - 65.876 km</Text>
        <Text style={styles.vehicleConditions}>Sem acidentes | sem roubos</Text>
        <Text style={styles.vehicleState}>São Paulo</Text>
        {!showFavoriteButton && onPressRemoveFavorite && (
          <View style={styles.vehicleActions}>
            <TouchableOpacity onPress={() => onPressRemoveFavorite(item.id)}>
              <Text style={styles.vehicleActionsText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  vehicleCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  vehicleImageWrapper: {
    position: 'relative',
  },
  vehicleImage: {
    width: RFValue(isIos ? 150 : 140),
    height: RFValue(isIos ? 140 : 130),
    padding: 8,
    marginRight: 16,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleBadge: {
    backgroundColor: colors.blue[100],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 110,
    paddingVertical: 2,
  },
  vehicleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.blue[500],
    textTransform: 'uppercase',
  },
  verifiedInfo: {
    marginTop: 8,
    fontSize: 10,
    color: colors.gray[500],
  },
  vehicleTitle: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[500],
  },
  vehiclePrice: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray[700],
  },
  vehicleYear: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray[500],
  },
  vehicleConditions: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[500],
  },
  vehicleState: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400',
    color: colors.gray[400],
  },
  vehicleActions: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  vehicleActionsText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blue[500],
  },
})
