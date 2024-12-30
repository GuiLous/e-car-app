import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors } from '@/config'

type PhotoPreviewProps = {
  photoUri: string
  onRetake: () => void
  onContinue: () => void
}

export const PhotoPreview = ({
  photoUri,
  onRetake,
  onContinue,
}: PhotoPreviewProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.preview} />

      <View style={styles.messageContainer}>
        <Text style={styles.messageTitle}>Verifique a foto do documento</Text>
        <View style={styles.checkList}>
          <View style={styles.checkItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.blue[500]}
            />
            <Text style={styles.checkText}>
              Todos os dados devem estar legíveis
            </Text>
          </View>
          <View style={styles.checkItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.blue[500]}
            />
            <Text style={styles.checkText}>
              Documento deve estar bem enquadrado
            </Text>
          </View>
          <View style={styles.checkItem}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={colors.blue[500]}
            />
            <Text style={styles.checkText}>
              Imagem não pode estar desfocada
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onRetake}>
          <Ionicons name="camera-reverse" size={24} color="white" />
          <Text style={styles.buttonText}>Tirar novamente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.continueButton]}
          onPress={onContinue}
        >
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  messageContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
  },
  messageTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  checkList: {
    gap: 12,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkText: {
    color: 'white',
    fontSize: 14,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  continueButton: {
    backgroundColor: colors.black,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})
