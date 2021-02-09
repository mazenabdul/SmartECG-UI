import React, { useState, useEffect, useContext } from 'react'
import DataContext from '../context/dataContext'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';

const Daily = ({ navigation }) => {

  const { getData } = useContext(DataContext)
  
  // useEffect(() => {
  //   const data = getData()
  //   console.log(data)
  // }, [])

  
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false);
  

  const onChange = (event, date) => {
    setShow(false)
    const dateString = JSON.stringify(date)
    setDate(dateString)
    //console.log(dateString)
    getData({dateString})
  
  }
  //console.log(date)

  return (
    <View style={{flex: 1}}>
      <Text style={styles.text}>Daily Data</Text>
      <View style={styles.view}>
      <Button mode='contained' style={styles.btn} onPress={() => setShow(!show)} >Select Timeframe</Button>
      {show && ( <DateTimePicker
          testID="dateTimePicker"
          display="default"
          value={date}
          onChange={onChange}
        /> )}
      
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
   
    
  },
  text: {
    fontSize: 30,
    padding:5,
    textAlign: 'center',
    marginVertical: 40,
    color: '#FFF',
    backgroundColor: '#4B51FF'
  },
  btn: {
    backgroundColor: '#4B51FF',
    padding: 5
  }
 
})

export default Daily
