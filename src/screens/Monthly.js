import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'

const Monthly = ({ navigation }) => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.text}>Monthly Data</Text>
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
  text: {
    fontSize: 30,
    padding: 5,
    textAlign: 'center',
    marginVertical: 40,
    color: '#FFF',
    backgroundColor: '#4B51FF'
  },
 
})

export default Monthly