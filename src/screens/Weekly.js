import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import TextHeader from '../components/TextHeader'

const Weekly = () => {
  return (
    <View>
      <TextHeader normal='Weekly' bold='Data' /> 
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

export default Weekly
