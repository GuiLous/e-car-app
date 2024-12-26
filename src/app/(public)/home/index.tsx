import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { SearchInput } from '@/components/shared'

import { colors } from '@/config'

import { formatAmountToBRL } from '@/utils'

const vehicles = [
  {
    id: '1',
    title: 'Mercedes bens classe A, 2024 0 km, - distribuidor autorizado',
    price: 35000.0,
    imageUrl:
      'https://img.freepik.com/premium-photo/illuminated-street-light_1048944-30346011.jpg?w=740',
  },
  {
    id: '2',
    title: 'Audi a4, 2024 0 km, 1.6 turbo',
    price: 50000.0,
    imageUrl:
      'https://img.freepik.com/fotos-gratis/detalhes-do-automovel-close-up-do-carro-novo_1303-26484.jpg?t=st=1735223538~exp=1735227138~hmac=97a645eefeb51d680f573d462b6caa9bf8c48c15a670d6f2b6077eba23a239ae&w=740',
  },
  {
    id: '3',
    title: 'Mercedes bens classe A, 2024 0 km',
    price: 60000.0,
    imageUrl:
      'https://img.freepik.com/psd-gratuitas/modelo-de-marketing-de-midias-sociais-psd-3d-feliz-natal-em-portugues-no-brasil-feliz-natal_314999-2643.jpg?t=st=1735223554~exp=1735227154~hmac=bfdb5448db100262c7b963c5631d40f19e66b33115fe8c87cdc0e63f3f7ca528&w=740',
  },
  {
    id: '4',
    title: 'Audi a4, 2024 0 km, 1.6 turbo',
    price: 50000.0,
    imageUrl:
      'https://img.freepik.com/fotos-gratis/detalhes-do-automovel-close-up-do-carro-novo_1303-26484.jpg?t=st=1735223538~exp=1735227138~hmac=97a645eefeb51d680f573d462b6caa9bf8c48c15a670d6f2b6077eba23a239ae&w=740',
  },
]

const isIos = Platform.OS === 'ios'

export default function Home() {
  const [searchText, setSearchText] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchWrapper}>
          <SearchInput
            placeholder="Buscar no app"
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </View>
      </View>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.vehicleCard}>
            <View style={styles.vehicleImageWrapper}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.vehicleImage}
              />

              <TouchableOpacity style={styles.favoriteButtonWrapper}>
                <Feather name="heart" size={16} color={colors.blue[500]} />
              </TouchableOpacity>
            </View>
            <View style={styles.vehicleInfo}>
              <View style={styles.vehicleBadge}>
                <Text style={styles.vehicleBadgeText}>Carro verificado</Text>
              </View>
              <Text style={styles.verifiedInfo}>
                Placa e chassi verificados
              </Text>
              <Text style={styles.vehicleTitle}>{item.title}</Text>
              <Text style={styles.vehiclePrice}>
                {formatAmountToBRL(item.price)}
              </Text>
              <Text style={styles.vehicleYear}>2020 - 65.876 km</Text>
              <Text style={styles.vehicleConditions}>
                Sem acidentes | sem roubos
              </Text>
              <Text style={styles.vehicleState}>São Paulo</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: colors.gray[700],
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
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
  favoriteButtonWrapper: {
    position: 'absolute',
    top: RFValue(isIos ? 14 : 6),
    right: RFValue(isIos ? 28 : 20),
    backgroundColor: colors.white,
    opacity: 0.9,
    borderRadius: 99999,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
})
