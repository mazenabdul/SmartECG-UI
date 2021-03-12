import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import AuthContext from '../context/authContext'
import TextHeader from '../components/TextHeader'


const Device = ({ navigation }) => {

  const { signOut, emailSend } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <TextHeader normal='Device' bold='Screen'/>
      <View  style={styles.view}>
        <Button mode='contained' style={styles.btn} onPress={emailSend} >Pair my Device</Button>
        <Button mode='contained' onPress={() => signOut(navigation)} style={styles.btn}>Sign Out</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },  
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 30,
    padding: 5,
    marginTop: 60,
    marginHorizontal: 20,
    color: '#000'
  },
  bold:{
    fontWeight: 'bold'
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
