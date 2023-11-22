import { StyleSheet, Text, View, SafeViewArea } from 'react-native'
import React from 'react'
import { theme } from '../utils/theme'

const AdminScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.white }}>
      <Text style={{ }}>Hi</Text>
    </SafeAreaView>
  )
}

export default AdminScreen

const styles = StyleSheet.create({})