import React, { useReducer, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../api/backend'



//Create the Data context
const DataContext = React.createContext()


//Create reducer which dispatches the actions
const dataReducer = (state, action) => {
  switch(action.type){
    case 'daily_data':
      return { ...state, 
        data: action.payload.voltages, 
        firstIndex: action.payload.calculation.firstIndex, 
        secondIndex: action.payload.calculation.secondIndex, 
        BPM: action.payload.BPM,
        breathingRate: action.payload.breathingRate,
        error: '',
        showData: true,
     
      
        }
    case 'weekly_data': 
      return { ...state,  
        data: action.payload.sum, 
        firstIndex: action.payload.calculation.firstIndex, 
        secondIndex: action.payload.calculation.secondIndex, 
        BPM: action.payload.averagedBPMs,
        breathingRate: action.payload.averagedBreathing,
        error: '',
        showData: true
        }
    case 'monthly_data': 
      return { ...state,  
        data: action.payload.sum, 
        firstIndex: action.payload.calculation.firstIndex, 
        secondIndex: action.payload.calculation.secondIndex, 
        BPM: action.payload.averagedBPMs,
        breathingRate: action.payload.averagedBreathing,
        error: '',
        showData: true
        }
    case 'error': {
      return { ...state,  
        data: [], 
        firstIndex: null, 
        secondIndex: null, 
        BPM: 0,
        error: true
        }

    }
    case 'clear_data': {
      return { ...state,  
        data: [], 
        firstIndex: null, 
        secondIndex: null, 
        BPM: 0,
        error: false,
        showData: false
        }
    }
    default:
      return state 
  } 
}

//Create the provider 
export const DataProvider = ({ children }) => {

  //Create the initial state 
  const initialState = { 
    data: [],
    BPM: 0,
    breathingRate: 0,
    firstIndex: null,
    secondIndex: null,
    error: false,
  }
 
//Create the reducer
const [state, dispatch] = useReducer(dataReducer,  {initialState}  )

//Create a helper function to compute the average breathing rates
const breathingRate = (data) => {
  if(data.length>0){
    const breathingRates = data.map(element => { return element.breathingRate })
    const avgBreathingRates = breathingRates.reduce(function(a, b){
      return a + b;
      }, 0)  
    
    return (avgBreathingRates/breathingRates.length)
  }
}

//Create a helper function to calculate R-R Intervals
const calculateRinterval = (voltages) => {
  let firstIndex = voltages.indexOf(Math.max(...voltages))

  let max=0
  for(let i=(firstIndex+100); i<voltages.length; i++){
    if(voltages[i] > max){
      max = voltages[i]
        
    }  
  }

  //Based on the returned max, find the index at which it occurs
  let secondIndex = voltages.findIndex(value => value === max)
    
  //Push the voltage array and min/max index object
  let results = {secondIndex, firstIndex}

  return results
}

//Compute BPM average 
const averageBPM = (data) => {
  if(data.length>0){
    const BPMs = data.map((obj) => { return obj.heartRate })

    //Find average of BPM array
    const averageBPM = BPMs.reduce((a, b) => a + b) / BPMs.length
    
    return averageBPM
  }
}

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
    const calculation = calculateRinterval(voltages)

    //Fetch the BPM
    const BPM = res.data[dataIndex].heartRate

    //Fetch the breathing rate 
    const breathingRate = res.data[dataIndex].breathingRate

    let results = { voltages, calculation, BPM, breathingRate }
    dispatch({ type: 'daily_data', payload: results })

  } catch (e) {
    dispatch({ type: 'error' })
   
  }
}

const weeklyData = async ({ startDate, endDate }) => {
  
  //Package into an object
  const dates = { startDate, endDate }
  const token = await AsyncStorage.getItem('token')
  
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
    
    //Generate dynamic time axis 
    let time = []
    for(let i=0;i<sum.length; i++){
      time[i] = i
    }

    const calculation = calculateRinterval(sum)
    const averagedBPMs = averageBPM(res.data)
    const averagedBreathing = breathingRate(res.data)
    //console.log(averagedBreathing)
    let results = { sum, calculation, averagedBPMs, averagedBreathing  }

    dispatch({ type: 'weekly_data', payload: results })
  } catch (e) {
    console.error(e)
    dispatch({ type: 'error'})
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
    
    const sorted = res.data.map(obj => {
      return obj.voltage
    })
    
    const sum = [];

    sorted.forEach((arr) => {
      arr.forEach((item, index) => {
        sum[index] = ((sum[index] ?? 0) + item) / arr.length
      });
    });
   
   
    const calculation = calculateRinterval(sum)
    const averagedBPMs = averageBPM(res.data)
    const averagedBreathing = breathingRate(res.data)
    //console.log(averagedBreathing)
    let results = { sum, calculation, averagedBPMs, averagedBreathing }
    dispatch({ type: 'monthly_data', payload: results })
     //console.log(sum);
} catch (e) {
  console.error(e)
  dispatch ({ type: 'error' })
}
}


const clearData = () => {
  dispatch({ type: 'clear_data' })
}

return <DataContext.Provider value={{state, dailyData, weeklyData, monthlyData, clearData }}>{children}</DataContext.Provider>

}

export default DataContext
