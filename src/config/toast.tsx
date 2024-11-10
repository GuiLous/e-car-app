import { StyleSheet } from 'react-native'
import { BaseToast, ErrorToast } from 'react-native-toast-message'

import { colors } from '@/config'

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.toastText}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.toast, styles.errorToast]}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.toastText}
    />
  ),
}

const styles = StyleSheet.create({
  toast: {
    borderLeftColor: colors.green[500],
    marginTop: 20,
    height: 60,
    width: '90%',
    zIndex: 9999,
    elevation: 9999,
  },
  errorToast: {
    borderLeftColor: colors.red[500],
  },
  toastContainer: {
    paddingHorizontal: 15,
  },
  toastText: {
    fontSize: 14,
    fontWeight: '400',
  },
})
