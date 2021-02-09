import React, { useReducer, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../api/backend'



//Create the Data context
const DataContext = React.createContext()


//Create reducer which dispatches the actions
const dataReducer = (state, action) => {
  switch(action.type){
    default:
      return state 
  } 
}

//Create the provider 
export const DataProvider = ({ children }) => {

 
//Create the reducer
const [state, dispatch] = useReducer(dataReducer, [{ date: null }])


//Create the actions here
const getData = async ({ dateString }) => {
  const token = await AsyncStorage.getItem('token')
  try {
    const res = await api.post('/daily', { dateString }, {
      headers: {
        'Authorization': token
      }
    })
    console.log(res)
  } catch (e) {
    console.error(e)
  }
}

return <DataContext.Provider value={{ getData }}>{children}</DataContext.Provider>

}

export default DataContext
