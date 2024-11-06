import { Feather } from '@expo/vector-icons'
import React, { FC } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Ticket } from '@/domain'

import { useDeleteTicketMutation } from '@/services/api'

import { colors } from '@/config'

import { formatDateToBRL } from '@/utils'

type ListTicketItemProps = {
  item: Ticket
}

export const ListTicketItem: FC<ListTicketItemProps> = ({ item }) => {
  const { deleteTicketMutation } = useDeleteTicketMutation()

  const handleDeleteTicket = () => {
    Alert.alert('Atenção', 'Tem certeza que deseja deletar o ingresso?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Deletar',
        onPress: () => deleteTicketMutation({ payload: { id: item.id } }),
      },
    ])
  }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>{item.name}</Text>

        <View style={styles.buyerInfo}>
          <View style={styles.buyerInfoRow}>
            <Text style={styles.buyerText}>Local: </Text>
            <Text style={styles.buyerValue}>{item.location}</Text>
          </View>
          <View style={styles.buyerInfoRow}>
            <Text style={styles.buyerText}>Data: </Text>
            <Text style={styles.buyerValue}>{formatDateToBRL(item.date)}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteIcon} onPress={handleDeleteTicket}>
        <Feather name="trash" size={24} color={colors.red[500]} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: colors.gray[500],
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[800],
  },
  itemInfo: {
    flex: 1,
    gap: 8,
  },
  buyerInfo: {
    marginTop: 8,
  },
  buyerText: {
    fontSize: 14,
    color: colors.gray[800],
    fontWeight: '500',
  },
  buyerValue: {
    fontSize: 14,
    color: colors.gray[500],
  },
  buyerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    position: 'absolute',
    right: 14,
    top: 12,
  },
})
