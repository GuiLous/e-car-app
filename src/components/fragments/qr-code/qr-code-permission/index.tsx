import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/shared'

import { colors } from '@/config'

type QrCodePermissionProps = {
  requestPermission: () => void
}

export const QrCodePermission = ({
  requestPermission,
}: QrCodePermissionProps) => {
  return (
    <View style={styles.permissionContainer}>
      <Text style={styles.message}>
        Precisamos da sua permissão para acessar a câmera
      </Text>
      <View
        style={{
          alignSelf: 'center',
          width: '60%',
        }}
      >
        <Button title="Permitir acesso à câmera" onPress={requestPermission} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    fontWeight: 'bold',
    color: colors.primary[500],
    textAlign: 'center',
    paddingBottom: 20,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})
