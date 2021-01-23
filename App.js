import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { AuthProvider } from './src/context/authContext'
import RegisterScreen from './src/screens/Register'
import SignInScreen from './src/screens/SignIn'

const navigator = createStackNavigator({
  Register: RegisterScreen,
  SignIn: SignInScreen
}, {
  initialRouteName: 'Register',
  defaultNavigationOptions: {
    //title: 'SmartECG Monitor',
    cardStyle: { backgroundColor: '#fff' }
  }
})

const App = createAppContainer(navigator)

export default () => {
  return <AuthProvider><App /></AuthProvider>
}