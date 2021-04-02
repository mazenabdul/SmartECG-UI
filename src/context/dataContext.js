import React, { useReducer, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../api/backend'



//Create the Data context
const DataContext = React.createContext()


//Create reducer which dispatches the actions
const dataReducer = (state, action) => {
  switch(action.type){
    case 'daily_data':
      return { ...state, data: action.payload}
    case 'weekly_data': 
      return { ...state, data: action.payload}
    case 'monthly_data': 
      return { ...state, data: action.payload}
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
      
  
    //Create R-R array with 2 values of selected voltage date. 2nd occurance of high - 1st occurance of high

    let voltages = res.data[dataIndex].voltage 
    //const results = []
    let firstIndex = voltages.indexOf(Math.max(...voltages))
    
    
    //console.log(firstIndex)

    //Based on this index, start a for loop with a buffer of +100 and find the next max
    let max=0
    for(let i=(firstIndex+100); i<voltages.length; i++){
      if(voltages[i] > max){
        max = voltages[i]
        
      }
      
    }
    //Based on the returned max, find the index at which it occurs
    let secondIndex = voltages.findIndex(value => value === max)
    //console.log(secondIndex)

    //Push the voltage array and min/max index object
    let results = {voltages, secondIndex, firstIndex }

    //console.log(results[0])

    dispatch({ type: 'daily_data', payload: results })
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
   
    const sorted = res.data.map(obj => {
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

    //console.log(sum)
    dispatch({ type: 'weekly_data', payload: sum })
  } catch (e) {
    console.error(e)
    dispatch({ type: 'error', payload: 'No data found for specified range' })
  }
  
}

const monthlyData = async({ input }) => {
  const token = await AsyncStorage.getItem('token')
  console.log(input)
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
