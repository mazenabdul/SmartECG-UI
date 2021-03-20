import React, { useState, useContext } from "react"
import { StyleSheet, View, Text } from "react-native"
import moment from "moment"
import DateTimePicker from '@react-native-community/datetimepicker'
import TextHeader from '../components/TextHeader'
import { Button } from 'react-native-paper'
import { TouchableOpacity } from "react-native-gesture-handler"
import DataContext from '../context/dataContext'

const Weekly  = () => {

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
        <Button mode='contained' onPress={() => weeklyData({ startDate, endDate })}>Calculate!</Button>
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

      
      
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    padding: 20
  
  },
  viewBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    marginTop: 20
  },
  btn: {
    backgroundColor: '#6200ee',
    marginHorizontal: 30,
    padding: 5
   
  },
  selectionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    
  },
  touch: {
    color: '#6200ee',
    margin: 10,
    fontSize: 20
  }
});

export default Weekly