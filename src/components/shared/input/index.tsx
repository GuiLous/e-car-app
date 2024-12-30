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
  label?: string
  rightIcon?: ReactNode
  isPassword?: boolean
  error?: boolean
  multiline?: boolean
  isSearch?: boolean
}

export const Input = ({
  label,
  rightIcon,
  isPassword,
  secureTextEntry,
  error,
  multiline,
  isSearch,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  function handleTogglePassword() {
    setShowPassword((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          multiline && styles.inputContainerMultiline,
          isSearch && styles.inputContainerSearch,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            isSearch && styles.inputSearch,
          ]}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          placeholderTextColor={colors.gray[500]}
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
    width: '100%',
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
    borderColor: colors.gray[400],
    backgroundColor: colors.white,
  },
  inputContainerFocused: {
    borderColor: colors.gray[700],
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  inputContainerMultiline: {
    minHeight: 120,
    height: 'auto',
    alignItems: 'flex-start',
  },
  inputContainerSearch: {
    height: 36,
    borderRadius: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputMultiline: {
    height: 'auto',
    minHeight: 120,
    maxHeight: 200,
    paddingTop: 12,
    paddingBottom: 12,
    lineHeight: 24,
  },
  inputSearch: {
    height: 36,
    fontSize: 14,
    color: colors.gray[700],
  },
  iconContainer: {
    paddingRight: 16,
  },
})
