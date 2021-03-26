import React, { useState, useEffect, useContext } from 'react'
import DataContext from '../context/dataContext'
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native'
import { Button, ActivityIndicator } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import TextHeader from '../components/TextHeader'
import { LineChart } from "react-native-chart-kit";
import chartProps from '../chartConfig/chartProps'


const Daily = ({ navigation }) => {

  const { state, dailyData, clearData } = useContext(DataContext)

  //State variables for date widget
  const [date, setDate] = useState(new Date())
  const [displayDate, setDisplayDate] = useState('')
  const [show, setShow] = useState(false);
  const [data, setData] = useState( null )
  const [loading, SetLoading] = useState(false)
 

  //Chart Requirements

  //Width
  const screenWidth = Dimensions.get("window").width;

  const onChange =  (event, date) => {
    setShow(false)
    SetLoading(true)
    const dateString = JSON.stringify(date).slice(1,11)
    setDate(dateString)
    //console.log(typeof(dateString))
    dailyData({ dateString })
    SetLoading(false)
    setDate(new Date())
    setDisplayDate(dateString)
    // setData(res)
  }
  console.log(state.data)
  return (
    <View style={{flex: 1}}>
      <TextHeader normal='Daily' bold='Data'/>
      <View style={styles.view}>
      <Button mode='contained' style={styles.btn} onPress={() => setShow(!show)} >Select Timeframe</Button>
      <View style={styles.textContainer}>
      <Text style={styles.text}>Data as of: {displayDate}</Text>
      </View>
      
      {show && ( <DateTimePicker
          testID="dateTimePicker"
          display="default"
          value={new Date()}
          onChange={onChange}
          
        /> )}
      {/* {state.error.length > 0 || state.error !== undefined && <Text style={styles.text}>No data for selected date! Try again</Text>}  */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.graphView}>
      { state.data.voltage &&  <LineChart 
        data={{ datasets: [{ data: state.data.voltage }]}} 
        width={850}
        height={330}  
        yAxisSuffix="V" 
        yAxisInterval={1} 
        chartConfig={chartProps}
        bezier
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
      
    </View>
    
  )
      }

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  graphView:{
    padding: 10
  },
  btn: {
    backgroundColor: '#6200ee',
    padding: 5,
    marginVertical: 10
  },
  textContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 'auto',
    marginTop: 20
  },
  text: {
    fontSize: 17,
    fontStyle: 'italic',
    marginLeft: 20
  }

})

export default Daily
