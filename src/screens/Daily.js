import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';



const Daily = ({ navigation }) => {

  let currentDate = new Date()
  const [date, setDate] = useState(1598051730000)
  const [show, setShow] = useState(false);
  

  const onChange = (event, date) => {
    setDate(date);
    setShow(false)
    
  };
  

  return (
    <View style={{flex: 1}}>
      <Text style={styles.text}>Daily Data</Text>
      <View style={styles.view}>
      <Button mode='contained' style={styles.btn} onPress={() => setShow(!show)} >Select Timeframe</Button>
      {show && ( <DateTimePicker
          testID="dateTimePicker"
          display="default"
          value={new Date()}
          onChange={onChange}
        /> )}
      
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    display: 'flex',
    //justifyContent: 'center',
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
