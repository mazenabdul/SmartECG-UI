import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native'
import { Button, TextInput, Snackbar } from 'react-native-paper'
import { AntDesign } from 'react-native-vector-icons'
import AuthContext from '../context/authContext'


const Register = ({ navigation }) => {

  //Context to manage registering endpoint
  const { state, newUser, localCheck } = useContext(AuthContext)
  
  //State to manage text inputs for email and passwords
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  
  //Check if the user is locally signed in already
  useEffect(() => {
    localCheck(navigation)
  }, [])

  const onDismissSnackbar = () => {
    setVisible(false)
  }
  const registerHandler =  ({ email, password, navigation }) => {
    setVisible(true)
    Keyboard.dismiss()
    setTimeout(() => {
      onDismissSnackbar()
      newUser({email, password, navigation})
    }, 1500)
    
   
  }

  return (
  <View style={styles.view}>
    <Text style={styles.text}>Sign Up <AntDesign size={35} name='user'></AntDesign> </Text>
    <TextInput value={email} onChangeText={(text) => setEmail(text)} style={styles.input} type='outlined' placeholder='Enter an e-mail' autoCapitalize='none' autoCorrect={false}></TextInput>
    <TextInput value={password} onChangeText={(text) => setPassword(text)}  placeholder='Enter a password' autoCapitalize='none' autoCorrect={false}></TextInput>
    {state.error !== undefined ? <Text style={styles.error}>Please enter a valid email and/or password</Text> : null}
    <Button mode='contained' style={styles.btn} onPress={() => registerHandler({email, password, navigation})} >Register</Button>
    <TouchableOpacity style={{ marginTop: 25}} onPress={() => navigation.navigate('SignIn')} >
      <Text style={{ color: '#6200ee' }}>Already have an account? Sign In here</Text>
    </TouchableOpacity>
    <Snackbar visible={visible} duration={700} onDismiss={onDismissSnackbar} style={styles.snack}>Registering...</Snackbar>
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
  error: {
    color: 'red'
  }, 
  snack: {
    backgroundColor: '#6200ee',
    width: 380,
    marginLeft: 15
  }
 
 
})

export default Register