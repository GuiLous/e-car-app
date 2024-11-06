import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { Input } from '@/components/shared'

import { colors } from '@/config'

type SearchInputProps = {
  searchText: string
  setSearchText: (text: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({
  searchText,
  setSearchText,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Input
        value={searchText}
        placeholder="Título, nome, email ou telefone..."
        onChangeText={setSearchText}
        rightIcon={<Feather name="search" size={20} color={colors.gray[500]} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
})
