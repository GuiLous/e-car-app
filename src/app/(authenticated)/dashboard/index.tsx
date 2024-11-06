import React, { useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useListOrderItems } from '@/services/api'

import { ListItem, SearchInput } from '@/components/fragments'

import { colors } from '@/config'

export default function Dashboard() {
  const { data, refetch, loading } = useListOrderItems()
  const [searchText, setSearchText] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return data?.orderItems || []

    const searchLower = searchText.toLowerCase()
    return (data?.orderItems || []).filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.customerName.toLowerCase().includes(searchLower) ||
        item.customerEmail.toLowerCase().includes(searchLower) ||
        item.customerPhone?.includes(searchText),
    )
  }, [data?.orderItems, searchText])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendas processadas</Text>

      <SearchInput searchText={searchText} setSearchText={setSearchText} />

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={refetch}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma venda processada.</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[500],
    marginBottom: 24,
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[500],
    marginTop: 24,
    textAlign: 'center',
  },
})
