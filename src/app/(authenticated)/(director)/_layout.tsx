import { Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

import { colors } from '@/config'

export default function DirectorLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ticket/create-ticket"
        options={{
          title: 'Ingressos',
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ticket/list-tickets"
        options={{
          title: 'Meus Ingressos',
          tabBarIcon: ({ color, size }) => (
            <Feather name="file" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="qr-code/index"
        options={{
          title: 'QR Code',
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
