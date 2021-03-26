import React, { useState, useContext } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import TextHeader from '../components/TextHeader'
import { Button } from 'react-native-paper'
import { TouchableOpacity } from "react-native-gesture-handler"
import DataContext from '../context/dataContext'
import { LineChart } from "react-native-chart-kit"
import chartProps from '../chartConfig/chartProps'

const Weekly  = () => {

  //Consume context from provider
  const { state } = useContext(DataContext)

  //Start date state
  const [startDate, setStartDate] = useState(new Date())
  const [showStart, setShowStart] = useState(false)

  //End date state
  const [endDate, setEndDate] = useState(new Date())
  const [showEnd, setShowEnd] = useState(false)

  const { weeklyData } = useContext(DataContext)


  //Handler for changing and showing start date 
  const changeStart = (event, date) => {
      setShowStart(false)
      const startDateString = JSON.stringify(date).slice(1,11)
      console.log(startDateString)
      setStartDate(date)
      
  }
  

  //Handler for changing and showing end date
  const changeEnd = (event, date) => {
    setShowEnd(false)
    const endDateString = JSON.stringify(date).slice(1,11)
    console.log(endDateString)
    setEndDate(date)
  }
  console.log(state)
  return (

    <View style={{ flex: 1 }}>
      <TextHeader normal='Weekly' bold='Data' />
      
      <View style={styles.viewBtn}>
        <TouchableOpacity   onPress={() => setShowStart(!showStart)}><Text style={styles.touch}>Start Date</Text></TouchableOpacity>
        <TouchableOpacity  onPress={() => setShowEnd(!showEnd)}><Text style={styles.touch}>End Date</Text></TouchableOpacity>
      </View>
      <View style={styles.selectionView}>
        <Text>{JSON.stringify(startDate).slice(1,11)}</Text>
        <Text>{JSON.stringify(endDate).slice(1,11)}</Text>
      </View>
      <View style={styles.viewBtn}>
        <Button style={{ marginTop: 20, padding: 5 }} mode='contained' onPress={() => weeklyData({ startDate, endDate })}>Calculate!</Button>
      </View>
      
        {showStart && ( <DateTimePicker
          testID="dateTimePicker"
          display="default"
          value={new Date()}
          onChange={changeStart} /> )}

        {showEnd && ( <DateTimePicker
          testID="dateTimePicker"
          display="default"
          value={new Date()}
          onChange={changeEnd} /> )}

        <View style={styles.err}>
          {state.error === 'No data found' || state.data.length === 0 && <Text style={styles.text}>No data for selected range! Try again</Text>}
        </View>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.graphView}>
      { (state.data !== undefined && state.data.length>0) &&  <LineChart 
        data={{ datasets: [{ data: state.data}]}} 
        width={850}
        height={330}  
        yAxisSuffix="V" 
        yAxisInterval={1} 
        chartConfig={chartProps}
        bezier
        withInnerLines={false}
        style={{ marginTop:10,   borderRadius: 16,shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7, }}/>   }
       
       
        </View>
        </ScrollView>
      
      
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  
  viewBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    
  },
  btn: {
    backgroundColor: '#6200ee',
    marginHorizontal: 30,

  },
  selectionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginHorizontal: 'auto'
    
  },
  touch: {
    color: '#6200ee',
    fontSize: 20,
    marginTop: 5
    },
  graphView:{
    padding: 10
  },
  text: {
    fontSize: 17,
    fontStyle: 'italic',
    
  },
  err: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
    
  },
});

export default Weekly