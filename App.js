import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AuthProvider } from './src/context/authContext'
import { DataProvider } from './src/context/dataContext'

//Screens
import RegisterScreen from './src/screens/Register'
import SignInScreen from './src/screens/SignIn'
import DeviceScreen from './src/screens/Device'
import DailyScreen from './src/screens/Daily'
import WeeklyScreen from './src/screens/Weekly'
import MonthlyScreen from './src/screens/Monthly'


//Icons
import { Octicons ,Entypo } from 'react-native-vector-icons'


const navigator = createSwitchNavigator({
  authFlow: createStackNavigator({
    Register: RegisterScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    Device: {
      screen: DeviceScreen,
      navigationOptions: {
        tabBarLabel: "My Device",
        tabBarIcon: () => (<Octicons color='white' name='device-mobile' size={25}></Octicons>)
      }
    }, 
    Daily: {
      screen: DailyScreen,
      navigationOptions: {
        
        tabBarIcon: () => (<Entypo color='white' name='bar-graph' size={25}></Entypo>)
      }
    } ,
    Weekly: {
      screen:  WeeklyScreen,
      navigationOptions: {
        tabBarIcon: () => (<Entypo color='white' name='line-graph' size={25}></Entypo>),
        
      }
    },
    Monthly:{
      screen: MonthlyScreen,
      navigationOptions: {  
        tabBarIcon: () => (<Entypo color='white' name='area-graph' size={25}></Entypo>),
        
      }
    } 
  }, {
    tabBarOptions: {
      style: {
        backgroundColor: '#6200ee',
        padding: 5
      },
      activeTintColor: '#FFF',
      inactiveTintColor: '#FFF'
    }
    
  })
  
})

const App = createAppContainer(navigator)

export default () => {
  return ( 
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    )
}