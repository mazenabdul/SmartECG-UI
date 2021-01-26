import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { AntDesign } from 'react-native-vector-icons'
import AuthContext from '../context/authContext'

const Register = ({ navigation }) => {

  //State to manage text inputs for email and passwords
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //Context to manage registering endpoint
  const { state, newUser } = useContext(AuthContext)
  console.log(state.error)
  
  return (
  <View style={styles.view}>
    <Text style={styles.text}>Sign Up <AntDesign size={35} name='user'></AntDesign> </Text>
    <TextInput value={email} onChangeText={(text) => setEmail(text)} style={styles.input} type='outlined' placeholder='Enter an e-mail' autoCapitalize='none' autoCorrect={false}></TextInput>
    <TextInput value={password} onChangeText={(text) => setPassword(text)}  placeholder='Enter a password' autoCapitalize='none' autoCorrect={false}></TextInput>
    {state.error !== undefined ? <Text style={styles.error}>Please enter a valid email and/or password</Text> : null}
    <Button mode='contained' style={styles.btn} onPress={() => newUser({email, password})} >Register</Button>
    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('SignIn')} >
      <Text style={{ color: '#4B51FF' }}>Already have an account? Sign In here</Text>
    </TouchableOpacity>
  </View>
)}

Register.navigationOptions = () => {
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

export default Register