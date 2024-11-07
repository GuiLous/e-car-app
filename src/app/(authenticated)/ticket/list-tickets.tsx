import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useListTickets } from '@/services/api'

import { ListTicketItem } from '@/components/fragments'

import { colors } from '@/config'

export default function ListTickets() {
  const { data, refetch, loading } = useListTickets()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Ingressos</Text>

      <FlatList
        data={data?.tickets || []}
        renderItem={({ item }) => <ListTicketItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={refetch}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum ingresso encontrado.</Text>
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