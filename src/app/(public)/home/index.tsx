import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { SearchInput, VehicleListCard } from '@/components/shared'

import { colors } from '@/config'

const vehiclesProducts = [
  {
    id: 1,
    title: 'Mercedes bens classe A, 2024 0 km, - distribuidor autorizado',
    price: 35000.0,
    imageUrl:
      'https://img.freepik.com/premium-photo/illuminated-street-light_1048944-30346011.jpg?w=740',
  },
  {
    id: 2,
    title: 'Audi a4, 2024 0 km, 1.6 turbo',
    price: 50000.0,
    imageUrl:
      'https://img.freepik.com/fotos-gratis/detalhes-do-automovel-close-up-do-carro-novo_1303-26484.jpg?t=st=1735223538~exp=1735227138~hmac=97a645eefeb51d680f573d462b6caa9bf8c48c15a670d6f2b6077eba23a239ae&w=740',
  },
  {
    id: 3,
    title: 'Mercedes bens classe A, 2024 0 km',
    price: 60000.0,
    imageUrl:
      'https://img.freepik.com/psd-gratuitas/modelo-de-marketing-de-midias-sociais-psd-3d-feliz-natal-em-portugues-no-brasil-feliz-natal_314999-2643.jpg?t=st=1735223554~exp=1735227154~hmac=bfdb5448db100262c7b963c5631d40f19e66b33115fe8c87cdc0e63f3f7ca528&w=740',
  },
  {
    id: 4,
    title: 'Audi a4, 2024 0 km, 1.6 turbo',
    price: 50000.0,
    imageUrl:
      'https://img.freepik.com/fotos-gratis/detalhes-do-automovel-close-up-do-carro-novo_1303-26484.jpg?t=st=1735223538~exp=1735227138~hmac=97a645eefeb51d680f573d462b6caa9bf8c48c15a670d6f2b6077eba23a239ae&w=740',
  },
]

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
        data={vehiclesProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <VehicleListCard item={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
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
})
