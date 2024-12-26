import { Feather } from '@expo/vector-icons'
import { FC } from 'react'

import { colors } from '@/config'

import { Input } from '../input'

type SearchInputProps = {
  searchText: string
  placeholder: string
  setSearchText: (text: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({
  searchText,
  setSearchText,
  placeholder,
}) => {
  return (
    <Input
      value={searchText}
      placeholder={placeholder}
      onChangeText={setSearchText}
      rightIcon={<Feather name="search" size={20} color={colors.gray[500]} />}
      isSearch
    />
  )
}
