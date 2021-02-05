import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import AuthContext from '../context/authContext'

const Device = ({ navigation }) => {

  const { signOut } = useContext(AuthContext)

  return (
    <View style={{flex: 1}}>
      <Text style={styles.text}>Device Screen</Text>
      <View  style={styles.view}>
        <Button mode='contained' style={styles.btn}>Pair my Device</Button>
        <Button mode='contained' onPress={() => signOut(navigation)} style={styles.btn}>Sign Out</Button>
      </View>
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
    textAlign: 'center',
    marginVertical: 40,
    color: '#4B51FF'
  },
  btn: {
    marginTop: 20,
    marginBottom: 80,
    width: 300,
    backgroundColor: '#4B51FF',
    padding: 15,
    
  }

})

export default Device
