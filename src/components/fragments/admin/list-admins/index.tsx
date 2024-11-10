import { Feather } from '@expo/vector-icons'
import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Admin } from '@/domain'

import { colors } from '@/config'

type ListAdminsProps = {
  item: Admin
  onDelete: (id: number) => void
}

export const ListAdmins: FC<ListAdminsProps> = ({ item, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>
          {item.firstName} {item.lastName}
        </Text>

        <View style={styles.adminInfo}>
          <View style={styles.adminInfoRow}>
            <Text style={styles.adminText}>Email: </Text>
            <Text style={styles.adminValue}>{item.email}</Text>
          </View>
          <View style={styles.adminInfoRow}>
            <Text style={styles.adminText}>Permissão: </Text>
            <Text style={styles.adminValue}>{item.role}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => onDelete(item.id)}
      >
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
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    maxWidth: 224,
  },
  itemInfo: {
    flex: 1,
    gap: 8,
  },
  adminInfo: {
    marginTop: 8,
  },
  adminText: {
    fontSize: 14,
    color: colors.gray[800],
    fontWeight: '500',
  },
  adminValue: {
    fontSize: 14,
    color: colors.gray[500],
  },
  adminInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    position: 'absolute',
    right: 14,
    top: 12,
  },
})
