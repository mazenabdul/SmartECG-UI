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
    case 'monthly_data': 
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

const weeklyData = async ({ startDate, endDate }) => {
  
  //Package into an object
  const dates = { startDate, endDate }
  const token = await AsyncStorage.getItem('token')
  console.log(dates)
  //Send the start and end dates to the /weekly endpoint
  try {
    const res = await api.post('/weekly', { dates }, {
      headers: {
        'Authorization': token
      }
    })
  } catch (e) {
    console.error(e)
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
        sum[index] = ((sum[index] ?? 0) + item) / arr.length
      });
    });
    //console.log(sum.length)
    //Generate dynamic time axis 
    let time = []
    for(let i=0;i<sum.length; i++){
      time[i] = i
    }
    //console.log(time)
    dispatch({ type: 'monthly_data', payload: { time, sum} })
     //console.log(sum);
} catch (e) {
  console.error(e)
  dispatch ({ type: 'error', payload: 'No data found' })
}
}

const clearData = () => {
  dispatch({ type: 'clear_data' })
}

return <DataContext.Provider value={{state, dailyData, weeklyData, monthlyData, clearData }}>{children}</DataContext.Provider>

}

export default DataContext
