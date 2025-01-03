import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from '@/config'

type Option = {
  label: string
  value: string
}

type SelectProps = {
  label?: string
  value: string
  options: Option[]
  onValueChange: (value: string) => void
  placeholder?: string
}

export function Select({
  label,
  value,
  options,
  onValueChange,
  placeholder,
}: SelectProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.picker}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          mode="dropdown"
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" enabled={false} />
          )}
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
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
  picker: {
    borderWidth: 2,
    borderColor: colors.gray[400],
    borderRadius: 8,
    backgroundColor: colors.white,
  },
})
