import AsyncStorage from '@react-native-community/async-storage'
import React, { useReducer } from 'react'
import api from '../api/backend'
import hardware from '../api/hardware'

//Create the auth context
const AuthContext = React.createContext()

//Create reducer which dispatches the actions
const authReducer = (state, action) => {
  switch(action.type){
    case 'register_user':
      return { ...state, token: action.payload, error: '' }
    case 'sign_in':
      return { ...state, token: action.payload.token, email: action.payload.email , error: '' }
    case 'add_error':
      return { ...state, error: action.payload }
    case 'clear_errors':
      return { ...state, error: undefined }
    default:
      return state
  }
}

//Create the provider
export const AuthProvider = ({ children }) => {

//Create the reducer
const [state, dispatch] = useReducer(authReducer, [{ token: null, email:'', error: '' }])

//Register a new user
const newUser = async( { email, password, navigation } ) => {
  try {
    const res = await api.post('/signup', { email, password })
    await AsyncStorage.setItem('token', res.data.token)
    dispatch({ type: 'register_user', payload: res.data.token })
    clearErrors()
    navigation.navigate('mainFlow')
  } catch (e) {
    dispatch({ type: 'add_error', payload: 'Please enter a valid email and/or password' })
  }
}

//Sign in Existing User
const signIn = async ({ email, password, navigation }) => {
  try {
    const res = await api.post('/signin', { email, password })
    await AsyncStorage.setItem('token', res.data.token)
    await AsyncStorage.setItem('email', res.data.email)
    dispatch({ type: 'sign_in', payload: res.data })
    clearErrors()
    navigation.navigate('mainFlow')
  } catch (e) {
    dispatch({ type: 'add_error', payload: 'Invalid email and/or password' })
  }
}

//Check if a token exists locally, then don't need to sign in repeatedly
const localCheck = async ( navigation ) => {
  const token = await AsyncStorage.getItem('token')

  //if it exists, then user is already signed in
  if(token) {
    dispatch({ type: 'sign_in', payload: token })
    navigation.navigate('mainFlow')
  } else {
    navigation.navigate('authFlow')
  }
}

//Send signed in user's email to Flask Backend
 const emailSend = async (email) => {
  try {
    let localEmail
    if(AsyncStorage.getItem('email')){
      localEmail = await AsyncStorage.getItem('email')
      console.log(localEmail)
      const hardwareSignal = await hardware.post('/email',  { localEmail } ) 
      
    } else {
      localEmail = email
      const hardwareSignal = await hardware.post('/email', { localEmail })
    }
  } catch (e) {
    dispatch({ type: 'add_error', payload: 'Please check your internet connection' })
  }
}
 
//Sign out a user
const signOut = async ( navigation ) => {
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('email')
  navigation.navigate('authFlow')
}

//Clear errors
const clearErrors = () => {
  dispatch({ type: 'clear_errors' })
}

return <AuthContext.Provider value={{ state, newUser, signIn, localCheck, signOut, emailSend, clearErrors }}>{children}</AuthContext.Provider>

}

export default AuthContext
