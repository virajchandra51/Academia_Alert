import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EventScreen = ({ route, navigation }) => {
  return (
    <View>
      <Text>{route.params.data.title}</Text>
    </View>
  )
}

export default EventScreen

const styles = StyleSheet.create({})