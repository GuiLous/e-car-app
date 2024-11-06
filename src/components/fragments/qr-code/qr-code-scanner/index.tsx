import { Ionicons } from '@expo/vector-icons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useScannerStore } from '@/stores'

import { Button } from '@/components/shared'

import { QrCodePermission } from '@/components/fragments/qr-code/qr-code-permission'

type QrCodeScannerProps = {
  failed?: boolean
  hasUpdated?: boolean
  onBarcodeScanned: (value: string) => void
  setHasError: (value: boolean) => void
  setHasUpdated: (value: boolean) => void
}

export const QrCodeScanner = ({
  onBarcodeScanned,
  failed,
  setHasError,
  hasUpdated,
  setHasUpdated,
}: QrCodeScannerProps) => {
  const [permission, requestPermission] = useCameraPermissions()
  const { setShowScanner } = useScannerStore()

  const qrCodeLock = useRef(false)

  const showMidButton = failed || hasUpdated

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return <QrCodePermission requestPermission={requestPermission} />
  }

  const handleClose = () => {
    setHasError(false)
    setHasUpdated(false)
    qrCodeLock.current = false
    setShowScanner(false)
  }

  const handleTryAgain = () => {
    setHasError(false)
    setHasUpdated(false)
    qrCodeLock.current = false
  }

  return (
    <View style={[styles.container, { height: '100%', width: '100%' }]}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrCodeLock.current) {
            qrCodeLock.current = true
            setTimeout(() => onBarcodeScanned(data), 300)
          }
        }}
      >
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>

        {showMidButton && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ width: '40%' }}>
              <Button
                variant="secondary"
                title={hasUpdated ? 'Próximo' : 'Tentar novamente'}
                onPress={handleTryAgain}
              />
            </View>
          </View>
        )}
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
