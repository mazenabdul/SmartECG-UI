import React, { useState, useContext } from 'react'
import AuthContext from '../context/authContext'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { Entypo } from 'react-native-vector-icons'

const SignIn = ({ navigation }) => {

  //State for email and password inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Context to manage sign in
  const { state, signIn } = useContext(AuthContext)
  const { error } = state
  
  return (

    <View style={styles.view}>
      <Text style={styles.text}>Sign In <Entypo size={30} name='pencil'></Entypo></Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} style={styles.input} type='outlined' placeholder='Enter an e-mail' autoCapitalize='none' autoCorrect={false}></TextInput>
      <TextInput value={password} onChangeText={text => setPassword(text)} placeholder='Enter a password' autoCapitalize='none' autoCorrect={false}></TextInput>
      {error !== undefined ? <Text style={styles.error}>Invalid Email and/or password</Text> : null}
      <Button mode='contained' style={styles.btn} onPress={() => signIn({ email, password, navigation })}>Sign In</Button>
      <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Register')} >
        <Text style={{ color: '#4B51FF' }}>New user? Register here</Text>
      </TouchableOpacity>
    </View>
)}

SignIn.navigationOptions = () => {
  return {
    header: () => (null)
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4B51FF',
    marginBottom: 50,
    marginTop: 70
 },
  input: {
    padding: 2,
    marginVertical: 15,

  },
  view: {
    display: 'flex',
    flex: 1,
    padding: 30, 
    
  },
  btn: {
    marginTop: 25,
    backgroundColor: '#4B51FF',
    padding: 5
  },
  touch: {
    marginTop: 25,
  },
  error: {
    color: 'red'
  }
 
})

export default SignIn