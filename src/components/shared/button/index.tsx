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
}

export function Button({
  title,
  style,
  loading,
  leftIcon,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        style,
        rest.disabled && styles.buttonDisabled,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' ? colors.primary[600] : colors.white}
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
    height: 52,
    backgroundColor: colors.primary[600],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.gray[300],
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
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  buttonTextSecondary: {
    color: colors.primary[600],
  },
})
