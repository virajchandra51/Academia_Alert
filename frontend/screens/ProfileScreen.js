import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { theme } from '../utils/theme'
import React from 'react'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.white }}>
      <Text style={{ }}>Hi</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})