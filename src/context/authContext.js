import React, { useReducer } from 'react'
import axios from 'axios'
import api from '../api/backend'

//Create the auth context
const AuthContext = React.createContext()

//Create reducer which dispatches the actions
const authReducer = (state, action) => {
  switch(action.type){
    case 'register_user':
      return { ...state, token: action.payload, error: '' }
    case 'sign_in':
      return { ...state, token: action.payload, error: '' }
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
const [state, dispatch] = useReducer(authReducer, [{ token: null, error: '' }])


//Register a new user
const newUser = async( {email, password} ) => {
  try {
    const res = await api.post('/signup', { email, password })
    //console.log(`Your token is: ${res.data.token}`)
    dispatch({ type: 'register_user', payload: res.data.token })
    clearErrors()
  } catch (e) {
    dispatch({ type: 'add_error', payload: 'Please enter a valid email and/or password' })
  }
}
//Sign in Existing User
const signIn = async ({ email, password }) => {
  try {
    const res = await api.post('/signin', { email, password })
    dispatch({ type: 'sign_in', payload: res.data.token })
    clearErrors()
    
  } catch (e) {
    dispatch({ type: 'add_error', payload: 'Invalid email and/or password' })
  }
}

//Clear errors
const clearErrors = () => {
  dispatch({ type: 'clear_errors' })
}


return <AuthContext.Provider value={{ state, newUser, signIn, clearErrors }}>{children}</AuthContext.Provider>

}

export default AuthContext
