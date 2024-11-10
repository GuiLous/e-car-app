import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { useDeleteAdminMutation, useListAdmins } from '@/services/api/admin'

import { ListAdmins } from '@/components/fragments/admin/list-admins'

import { colors } from '@/config'

export default function Admin() {
  const { data, refetch, loading } = useListAdmins()
  const { deleteAdminMutation } = useDeleteAdminMutation()

  const handleRedirectToCreateAdmin = () => {
    router.push('/admin/create-admin')
  }

  const handleDeleteAdmin = (id: number) => {
    Alert.alert('Atenção', 'Tem certeza que deseja deletar este usuário?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        onPress: () => deleteAdminMutation({ payload: { id } }),
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      <View style={styles.searchRow}>
        <TouchableOpacity
          onPress={handleRedirectToCreateAdmin}
          style={styles.addButton}
        >
          <Feather name="plus" size={24} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data?.admins || []}
        renderItem={({ item }) => (
          <ListAdmins item={item} onDelete={handleDeleteAdmin} />
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
