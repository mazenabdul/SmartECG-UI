import React, { useReducer } from 'react'

//Create the auth context
const AuthContext = React.createContext()

//Create reducer which dispatches the actions
const authReducer = (state, action) => {
  switch(action.type){
    default:
      return state
      
  }
}

//Create the provider 
export const AuthProvider = ({ children }) => {


//Create the reducer
const [token, setToken] = useReducer(authReducer, [{ token: null, error: '' }])


//Register a new user
const newUser = ( email, password ) => {
  console.log(`Email: ${email} Password: ${password}`)
}
//Sign in Existing User
const signIn = (email, password) => {
  console.log(`Email: ${email} Password: ${password}`)
}

return <AuthContext.Provider value={{ newUser, signIn }}>{children}</AuthContext.Provider>

}

export default AuthContext
