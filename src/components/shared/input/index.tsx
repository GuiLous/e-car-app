import { Feather } from '@expo/vector-icons'
import { ReactNode, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

import { colors } from '@/config'

interface InputProps extends TextInputProps {
  label: string
  rightIcon?: ReactNode
  isPassword?: boolean
  error?: boolean
}

export const Input = ({
  label,
  rightIcon,
  isPassword,
  secureTextEntry,
  error,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  function handleTogglePassword() {
    setShowPassword((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        <TextInput
          style={styles.input}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleTogglePassword}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: colors.gray[500],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray[200],
    backgroundColor: colors.white,
  },
  inputContainerFocused: {
    borderColor: colors.gray[800],

    shadowColor: colors.gray[800],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  iconContainer: {
    paddingRight: 16,
  },
})
