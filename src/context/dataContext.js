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
    //Get the last index of the array if there are multiple
    
      
    const dataIndex = res.data.length-1
      
    //console.log(dataIndex)
    console.log(res.data[dataIndex].voltage)
    //console.log(res.data[0])
    dispatch({ type: 'daily_data', payload: res.data[dataIndex] })
  } catch (e) {
    dispatch({ type: 'error', payload: 'No data found' })
    // console.log(e)
  }
}

const monthlyData = async({ input }) => {
  const token = await AsyncStorage.getItem('token')
  try {
    const res = await api.post('/monthly', { input }, {
      headers: {
        'Authorization': token
      } 
    })
    const data = res.data
    const sorted = data.map(obj => {
      return obj.voltage
    })
    const sum = [];

    sorted.forEach((arr) => {
      arr.forEach((item, index) => {
        sum[index] = ((sum[index] ?? 0) + item) / arr.length+1
      });
    });

    console.log(sum);
} catch (e) {
  console.error(e)
}
}

const clearData = () => {
  dispatch({ type: 'clear_data' })
}

return <DataContext.Provider value={{state, dailyData, monthlyData, clearData }}>{children}</DataContext.Provider>

}

export default DataContext
