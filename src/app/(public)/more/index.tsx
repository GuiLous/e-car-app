import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button } from '@/components/shared'

import { colors } from '@/config'

interface MenuItemProps {
  title: string
  iconName?: keyof typeof Feather.glyphMap
}

export default function More() {
  const handleRedirectToSignIn = () => router.replace('/sign-in')

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.headerTitle}>Entre na sua conta</Text>
          <Text style={styles.headerSubtitle}>
            Veja os detalhes de envio e personalize sua experiência.
          </Text>
        </View>

        <View style={{ width: '100%' }}>
          <Button
            height={40}
            variant="secondary"
            title="Entrar"
            onPress={handleRedirectToSignIn}
          />
        </View>
      </View>

      <View style={styles.menu}>
        <MenuItem title="Início" iconName="home" />
        <MenuItem title="Buscar" iconName="search" />
        <MenuItem title="Favoritos" iconName="heart" />
      </View>
    </ScrollView>
  )
}

function MenuItem({ title, iconName }: MenuItemProps) {
  const handlePress = () => {
    switch (title) {
      case 'Início':
        return router.push('/home')
      case 'Buscar':
        return router.push('/')
      case 'Favoritos':
        return router.push('/favorites')
    }
  }

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <Feather name={iconName} size={24} color={colors.gray[900]} />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    backgroundColor: colors.black,
    padding: 16,
  },
  userInfo: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  menu: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
})
