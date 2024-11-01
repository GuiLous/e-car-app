import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { colors } from '@/config'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
}

export function Button({ title, style, loading, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, style, rest.disabled && styles.buttonDisabled]}
      {...rest}
    >
      {loading && <ActivityIndicator size="large" color={colors.white} />}

      {!loading && (
        <Text
          style={[
            styles.buttonText,
            rest.disabled && styles.buttonTextDisabled,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    backgroundColor: colors.primary[600],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.gray[300],
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: colors.gray[500],
  },
})
