import React, { useState, useEffect, useContext } from 'react'
import DataContext from '../context/dataContext'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import TextHeader from '../components/TextHeader'
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import chartProps from '../chartConfig/chartProps'


const Daily = ({ navigation }) => {

  const { state, dailyData, clearData } = useContext(DataContext)

  // useEffect(() => {
  //   clearData()
  // }, [])

  //State variables for date widget
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  const [data, setData] = useState( null )

  //Chart Requirements

  //Width
  const screenWidth = Dimensions.get("window").width;

  const onChange =  (event, date) => {
    setShow(false)
    const dateString = JSON.stringify(date).slice(1,11)
    setDate(dateString)
    //console.log(typeof(dateString))
     dailyData({ dateString })
    setDate(new Date())
    // setData(res)
  }
  

  //Data
  //const values = { }

  console.log(state.error)
  // console.log(state.data.voltage.length)

  return (
    <View style={{flex: 1}}>
      <TextHeader normal='Daily' bold='Data'/>
      <View style={styles.view}>
      <Button mode='contained' style={styles.btn} onPress={() => setShow(!show)} >Select Timeframe</Button>
      {show && ( <DateTimePicker
          testID="dateTimePicker"
          display="default"
          value={new Date()}
          onChange={onChange}
          
        /> )}

       {state.data.voltage !== undefined &&  <LineChart 
        data={{labels: state.data.time, datasets: [{ data: state.data.voltage}]}} 
        width={screenWidth} 
        height={330} 
        xAxisLabel="s" 
        yAxisSuffix="V" 
        yAxisInterval={1} 
        chartConfig={chartProps}
        bezier
        style={{ marginVertical: 20, padding: 30, borderRadius: 16, }}/> }
        {state.error === 'No data found' && <Text>No data for selected date! Try again</Text>}
      </View>
    </View>
  )
      }



const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    padding: 25
  
  },
  btn: {
    backgroundColor: '#4B51FF',
    padding: 5,
    marginBottom: 10
  }

})

export default Daily
