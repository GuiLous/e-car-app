import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { FieldSignUp, useSignUpStore } from '@/stores'

import { Button } from '@/components/shared'
import { DocumentCamera } from '@/components/shared/document-camera'

import { colors } from '@/config'

import documentInstructionsImage from '../../../../../../assets/ilustration-doc.png'

const documentInstructions = [
  'Retire os documentos da capinha protetora',
  'Desative o flash da câmera',
  'Posicione o documento em fundo neutro',
  'Mantenha o celular na horizontal',
  'Tire a foto em ambiente bem iluminado',
  'O documento deve ocupar toda a foto',
]

export default function DocumentsPhoto() {
  const { data, setField } = useSignUpStore()

  const [showCamera, setShowCamera] = useState(false)

  const handleSetFields = (field: FieldSignUp, value: any) => {
    setField(field, value)
  }

  const handlePhotoCapture = (base64Photo: string) => {
    if (!data.documentFrontPhoto) {
      setShowCamera(false)
      return handleSetFields('documentFrontPhoto', base64Photo)
    }

    handleSetFields('documentBackPhoto', base64Photo)
    setShowCamera(false)
    router.push('/address')
  }

  const removePhoto = () => {
    if (data.documentFrontPhoto) {
      return handleSetFields('documentFrontPhoto', null)
    }

    handleSetFields('documentBackPhoto', null)
    router.push('/documents')
  }

  return (
    <>
      {showCamera && (
        <DocumentCamera
          onPhotoCapture={handlePhotoCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
      {!showCamera && (
        <View style={styles.container}>
          {!data.documentFrontPhoto ? (
            <Text style={styles.title}>
              Tire uma foto da <Text style={{ fontWeight: 700 }}>FRENTE</Text>{' '}
              do seu Rg.
            </Text>
          ) : (
            <Text style={styles.title}>
              Agora, tire uma foto do{' '}
              <Text style={{ fontWeight: 700 }}>VERSO</Text> do seu RG.
            </Text>
          )}

          <Image
            source={documentInstructionsImage}
            style={{ width: '100%', height: 200 }}
            resizeMode="contain"
          />

          <View style={styles.instructionsWrapper}>
            {documentInstructions.map((instruction) => (
              <View key={instruction} style={styles.instruction}>
                <Feather
                  name="check-circle"
                  color={colors.green[500]}
                  size={16}
                />
                <Text style={{ fontSize: 16, fontWeight: 400 }}>
                  {instruction}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ gap: 12 }}>
            <Button title="Abrir câmera" onPress={() => setShowCamera(true)} />
            <Button variant="secondary" title="Voltar" onPress={removePhoto} />
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: colors.gray[50],
    justifyContent: 'space-between',
  },
  stepContainer: {
    paddingTop: 16,
    flex: 1,
  },
  instructionsWrapper: {
    alignItems: 'flex-start',
    gap: 12,
  },
  instruction: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: colors.black,
    textAlign: 'center',
  },
})
