import React, { useState, useContext } from 'react'
import AuthContext from '../context/authContext'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper'
import { Entypo } from 'react-native-vector-icons'

const SignIn = ({ navigation }) => {

  //State for email and password inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  //Context to manage sign in
  const { state, signIn } = useContext(AuthContext)
  const { error } = state

  const onDismissSnackbar = () => {
    setVisible(false)
  }
  const signInHandler =  ({ email, password, navigation }) => {
    setVisible(true)
    Keyboard.dismiss()
    setTimeout(() => {
      onDismissSnackbar()
      signIn({email, password, navigation})
    }, 1500)
    
   
  }
  
  return (

    <View style={styles.view}>
      <Text style={styles.text}>Sign In <Entypo size={30} name='pencil'></Entypo></Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} style={styles.input} type='outlined' placeholder='Enter an e-mail' autoCapitalize='none' autoCorrect={false}></TextInput>
      <TextInput value={password} onChangeText={text => setPassword(text)} placeholder='Enter a password' autoCapitalize='none' autoCorrect={false}></TextInput>
      {error !== undefined ? <Text style={styles.error}>Invalid Email and/or password</Text> : null}
      <Button mode='contained' style={styles.btn} onPress={() => signInHandler({ email, password, navigation })}>Sign In</Button>
      <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Register')} >
        <Text style={{ color: '#6200ee' }}>New user? Register here</Text>
      </TouchableOpacity>
      <Snackbar visible={visible} duration={700} onDismiss={onDismissSnackbar} style={styles.snack}>Signing in...</Snackbar>
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
    color: '#6200ee',
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
    backgroundColor: '#6200ee',
    padding: 5
  },
  touch: {
    marginTop: 25,
  },
  error: {
    color: 'red'
  },
  snack: {
    backgroundColor: '#6200ee',
    width: 380,
    marginLeft: 15
  }
 
})

export default SignIn