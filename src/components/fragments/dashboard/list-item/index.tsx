import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { OrderItem } from '@/domain'

import { colors } from '@/config'

import { formatAmountToBRL, formatPhoneNumber } from '@/utils'

type ListItemProps = {
  item: OrderItem
}

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return styles.statusPending
    case 'completed':
      return styles.statusCompleted
    default:
      return styles.statusPending
  }
}

export const ListItem: FC<ListItemProps> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>
          {item.title} - Qtd: {item.quantity}
        </Text>
        <Text style={styles.itemPrice}>
          {formatAmountToBRL(Number(item.price))}
        </Text>

        <View style={styles.buyerInfo}>
          <View style={styles.buyerInfoRow}>
            <Text style={styles.buyerText}>Comprador: </Text>
            <Text style={styles.buyerValue}>{item.customerName}</Text>
          </View>
          <View style={styles.buyerInfoRow}>
            <Text style={styles.buyerText}>Email: </Text>
            <Text style={styles.buyerValue}>{item.customerEmail}</Text>
          </View>
          <View style={styles.buyerInfoRow}>
            <Text style={styles.buyerText}>Telefone: </Text>
            <Text style={styles.buyerValue}>
              {formatPhoneNumber(item.customerPhone || '-----------')}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            getStatusStyle(item.ticketCode?.used ? 'completed' : 'pending'),
          ]}
        >
          <Text style={styles.statusText}>
            {item.ticketCode?.used ? 'Usado' : 'Não usado'}
          </Text>
        </View>
      </View>
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
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusPending: {
    backgroundColor: colors.yellow[100],
  },
  statusCompleted: {
    backgroundColor: colors.green[100],
  },
  buyerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
