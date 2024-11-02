import { Ionicons } from '@expo/vector-icons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useScannerStore } from '@/stores'

import { QrCodePermission } from '@/components/fragments/qr-code/qr-code-permission'

export const QrCodeScanner = () => {
  const [permission, requestPermission] = useCameraPermissions()
  const { setShowScanner } = useScannerStore()

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return <QrCodePermission requestPermission={requestPermission} />
  }

  const handleClose = () => {
    setShowScanner(false)
  }

  return (
    <View style={[styles.container, { height: '100%', width: '100%' }]}>
      <CameraView style={styles.camera} facing="back">
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 999,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
})
