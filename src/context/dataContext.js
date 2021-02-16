import React, { useReducer, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../api/backend'



//Create the Data context
const DataContext = React.createContext()


//Create reducer which dispatches the actions
const dataReducer = (state, action) => {
  switch(action.type){
    case 'daily_data':
      return { ...state, data: action.payload, error: '' }
    case 'clear_data':
      return { ...state, data: [] }
    case 'error': {
      return { ...state, data:[], error: action.payload }
    }
    default:
      return state 
  } 
}

//Create the provider 
export const DataProvider = ({ children }) => {

 
//Create the reducer
const [state, dispatch] = useReducer(dataReducer, { data: [], error: '' } )


//Create the actions here
const dailyData = async ({ dateString }) => {
  const token = await AsyncStorage.getItem('token')
  try {
    const res = await api.post('/daily', { dateString }, {
      headers: {
        'Authorization': token
      }
    })
   //console.log(res.data)
    dispatch({ type: 'daily_data', payload: res.data })
  } catch (e) {
    dispatch({ type: 'error', payload: 'No data found' })
    // console.log(e)
  }
}

const clearData = () => {
  dispatch({ type: 'clear_data' })
}

return <DataContext.Provider value={{state, dailyData, clearData }}>{children}</DataContext.Provider>

}

export default DataContext
