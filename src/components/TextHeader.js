import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Title = ({ normal, bold }) => {
  return (
    <View>
      <Text style={styles.text}>{normal} <Text style={styles.bold}>{bold}</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    padding:5,
    marginTop: 60,
    marginBottom: 20,
    marginHorizontal: 20,
    color: '#6200ee',
  },
  bold:{
    fontWeight: 'bold',
    color:'#6200ee'
  },
})

export default Title
