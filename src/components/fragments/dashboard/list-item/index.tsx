import { Feather } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

import { useCurrentAdmin } from '@/contexts'

import { TicketCode } from '@/domain'

import { colors } from '@/config'

import { formatAmountToBRL, formatPhoneNumber } from '@/utils'

type ListItemProps = {
  item: TicketCode
  onDelete?: (item: TicketCode) => void
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

export const ListItem: FC<ListItemProps> = ({ item, onDelete }) => {
  const { admin } = useCurrentAdmin()

  const role = admin?.role

  const canDelete = role === 'master' || role === 'director'

  const handleCopyUUID = async () => {
    await Clipboard.setStringAsync(item.uuid)
    Toast.show({
      text1: 'Código copiado!',
    })
  }

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete?.(item)}
      >
        <Feather name="trash-2" size={24} color="white" />
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable
      enabled={canDelete}
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemText}>
            {item.shopifyOrderItem.title}{' '}
            {item.shopifyOrderItem.manual && '(manual)'}
          </Text>
          <View style={styles.uuidContainer}>
            <Text style={styles.itemUuid}>{item.uuid}</Text>
            <TouchableOpacity
              onPress={handleCopyUUID}
              style={styles.copyButton}
            >
              <Feather name="copy" size={16} color={colors.gray[500]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>
            {formatAmountToBRL(Number(item.shopifyOrderItem.price))}
          </Text>

          <View style={styles.buyerInfo}>
            <View style={styles.buyerInfoRow}>
              <Text style={styles.buyerText}>Comprador: </Text>
              <Text style={styles.buyerValue}>
                {item.shopifyOrderItem.customerName}
              </Text>
            </View>
            <View style={styles.buyerInfoRow}>
              <Text style={styles.buyerText}>Email: </Text>
              <Text style={styles.buyerValue}>
                {item.shopifyOrderItem.customerEmail}
              </Text>
            </View>
            <View style={styles.buyerInfoRow}>
              <Text style={styles.buyerText}>Telefone: </Text>
              <Text style={styles.buyerValue}>
                {formatPhoneNumber(
                  item.shopifyOrderItem.customerPhone || '-----------',
                )}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              getStatusStyle(item.used ? 'completed' : 'pending'),
            ]}
          >
            <Text style={styles.statusText}>
              {item.used ? 'Usado' : 'Não usado'}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
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
  itemUuid: {
    fontSize: 14,
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
  uuidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  copyButton: {
    padding: 4,
  },
  deleteButton: {
    backgroundColor: colors.red[500],
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '95.5%',
  },
})
