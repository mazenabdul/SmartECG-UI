import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import TextHeader from '../components/TextHeader'

const Monthly = ({ navigation }) => {
  return (
    <View style={{flex: 1}}>
      <TextHeader normal='Monthly' bold='Data'/> 
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
 
 
})

export default Monthly
