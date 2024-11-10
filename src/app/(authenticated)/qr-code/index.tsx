import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useScannerStore } from '@/stores'

import { useUpdateTicketUsedMutation } from '@/services/api/ticket-code'

import { Button, Input } from '@/components/shared'

import { QrCodeScanner } from '@/components/fragments'

import { colors } from '@/config'

export default function QRCode() {
  const { showScanner, setShowScanner } = useScannerStore()
  const { updateTicketUsedMutation, loading } = useUpdateTicketUsedMutation()

  const [ticketCode, setTicketCode] = useState('')
  const [hasError, setHasError] = useState(false)
  const [hasUpdated, setHasUpdated] = useState(false)

  const disableVerifyButton = loading || ticketCode.length === 0

  const handleOpenQRCodeReader = () => {
    setShowScanner(true)
  }

  const onSuccess = () => {
    setTicketCode('')
    setHasUpdated(true)
  }

  const onError = () => {
    setHasError(true)
  }

  const handleVerifyTicket = () => {
    updateTicketUsedMutation({
      payload: { uuid: ticketCode },
      onSuccess,
      onError,
    })
  }

  const handleBarcodeScanned = (barcode: string) => {
    updateTicketUsedMutation({ payload: { uuid: barcode }, onSuccess, onError })
  }

  return showScanner ? (
    <QrCodeScanner
      onBarcodeScanned={handleBarcodeScanned}
      failed={hasError}
      setHasError={setHasError}
      hasUpdated={hasUpdated}
      setHasUpdated={setHasUpdated}
    />
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
              <Feather
                name="check"
                size={20}
                color={
                  disableVerifyButton ? colors.gray[500] : colors.primary[600]
                }
              />
            }
            loading={loading}
            disabled={disableVerifyButton}
          />
        </View>

        <Button
          title="Ler QR Code"
          onPress={handleOpenQRCodeReader}
          leftIcon={<Feather name="camera" size={20} color={colors.white} />}
          disabled={loading}
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
