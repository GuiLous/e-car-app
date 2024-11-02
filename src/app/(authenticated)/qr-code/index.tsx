import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useScannerStore } from '@/stores'

import { Button, Input } from '@/components/shared'

import { QrCodeScanner } from '@/components/fragments'

import { colors } from '@/config'

export default function QRCode() {
  const [ticketCode, setTicketCode] = useState('')
  const { showScanner, setShowScanner } = useScannerStore()

  const handleOpenQRCodeReader = () => {
    setShowScanner(true)
  }

  const handleVerifyTicket = () => {
    console.log('Verificando ticket:', ticketCode)
  }

  return showScanner ? (
    <QrCodeScanner />
  ) : (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Input
            label="Código do Ingresso"
            placeholder="Digite o código manualmente..."
            value={ticketCode}
            onChangeText={setTicketCode}
            rightIcon={
              <Feather name="edit" size={20} color={colors.gray[500]} />
            }
          />

          <Button
            title="Verificar"
            onPress={handleVerifyTicket}
            style={styles.verifyButton}
            variant="secondary"
            leftIcon={
              <Feather name="check" size={20} color={colors.primary[600]} />
            }
          />
        </View>

        <Button
          title="Ler QR Code"
          onPress={handleOpenQRCodeReader}
          leftIcon={<Feather name="camera" size={20} color={colors.white} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    gap: 16,
  },
  form: {
    gap: 12,
    marginBottom: 32,
  },
  verifyButton: {
    marginTop: 8,
  },
})
