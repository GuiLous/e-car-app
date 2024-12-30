import { ReactNode } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { colors } from '@/config'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  loading?: boolean
  leftIcon?: ReactNode
  variant?: 'primary' | 'secondary'
  height?: number
}

export function Button({
  title,
  style,
  loading,
  leftIcon,
  variant = 'primary',
  height,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        { height: height || 52 },
        style,
        rest.disabled && styles.buttonDisabled,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' ? colors.gray[600] : colors.white}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
          <Text
            style={[
              styles.buttonText,
              variant === 'secondary' && styles.buttonTextSecondary,
              rest.disabled && styles.buttonTextDisabled,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.gray[200],
    borderColor: colors.gray[200],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: colors.gray[500],
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.gray[50],
    borderWidth: 2,
    borderColor: colors.gray[800],
  },
  buttonTextSecondary: {
    color: colors.black,
  },
})
