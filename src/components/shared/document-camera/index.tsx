import { Ionicons } from '@expo/vector-icons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { PhotoPreview } from '../photo-preview'

type DocumentCameraProps = {
  onClose: () => void
  onPhotoCapture: (photo: string) => void
}

export const DocumentCamera = ({
  onPhotoCapture,
  onClose,
}: DocumentCameraProps) => {
  const [permission, requestPermission] = useCameraPermissions()
  const [camera, setCamera] = useState<CameraView | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para acessar a câmera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Permitir acesso</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleTakePicture = async () => {
    if (!camera) return

    try {
      const photo = await camera.takePictureAsync()

      if (photo?.uri) {
        setPhoto(photo.uri)
      }
    } catch {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao capturar a foto, tente novamente!',
      )
    }
  }

  const handleRetake = () => {
    setPhoto(null)
  }

  const handleContinue = () => {
    if (photo) {
      onPhotoCapture(photo)
    }
  }

  if (photo) {
    return (
      <PhotoPreview
        photoUri={photo}
        onRetake={handleRetake}
        onContinue={handleContinue}
      />
    )
  }

  return (
    <View style={[styles.container, { height: '100%', width: '100%' }]}>
      <CameraView
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        facing="back"
      >
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePicture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
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
  message: {
    color: 'white',
    textAlign: 'center',
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  permissionButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  permissionButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
