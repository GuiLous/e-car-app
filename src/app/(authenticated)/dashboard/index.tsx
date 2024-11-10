import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useMemo, useState } from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { TicketCode } from '@/domain'

import {
  useDeleteTicketCodeMutation,
  useListTicketCodes,
} from '@/services/api/ticket-code'

import { ListItem, SearchInput } from '@/components/fragments'

import { colors } from '@/config'

export default function Dashboard() {
  const { data, refetch, loading } = useListTicketCodes()
  const { deleteTicketCodeMutation } = useDeleteTicketCodeMutation()

  const [searchText, setSearchText] = useState('')

  const handleRedirectToCreateTicket = () => {
    router.push('/dashboard/create-order')
  }

  const handleDeleteTicketCode = (item: TicketCode) => {
    Alert.alert('Atenção', 'Tem certeza que deseja deletar este pedido?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        onPress: () => deleteTicketCodeMutation({ payload: { id: item.id } }),
      },
    ])
  }

  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return data?.ticketCodes || []

    const searchLower = searchText.toLowerCase()

    return (data?.ticketCodes || []).filter(
      (item) =>
        item.shopifyOrderItem.title.toLowerCase().includes(searchLower) ||
        item.shopifyOrderItem.customerName
          .toLowerCase()
          .includes(searchLower) ||
        item.shopifyOrderItem.customerEmail
          .toLowerCase()
          .includes(searchLower) ||
        item.shopifyOrderItem.customerPhone?.includes(searchText),
    )
  }, [data?.ticketCodes, searchText])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendas processadas</Text>

      <View style={styles.searchRow}>
        <SearchInput searchText={searchText} setSearchText={setSearchText} />

        <TouchableOpacity
          onPress={handleRedirectToCreateTicket}
          style={styles.addButton}
        >
          <Feather name="plus" size={24} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <ListItem item={item} onDelete={handleDeleteTicketCode} />
        )}
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
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[500],
    marginTop: 24,
    textAlign: 'center',
  },
  searchRow: {
    width: '100%',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  addButton: {
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignSelf: 'flex-end',
  },
})
