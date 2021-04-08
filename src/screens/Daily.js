import React, { useState,useContext } from 'react'
import { NavigationEvents } from 'react-navigation'
import DataContext from '../context/dataContext'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import TextHeader from '../components/TextHeader'
import { LineChart } from "react-native-chart-kit";
import chartProps from '../chartConfig/chartProps'
import Analytics from '../components/Analytics'
import ContentLoader, { Rect } from "react-content-loader/native"


const Daily = ({ navigation }) => {

  const { state, dailyData, clearData } = useContext(DataContext)
  const { data, showData, error, secondIndex, firstIndex, BPM } = state
  //State variables for date widget
  const [date, setDate] = useState(new Date())
  const [displayDate, setDisplayDate] = useState('')
  const [show, setShow] = useState(false);
  
 

  const onChange =  async (event, date) => {
   
    const dateString = JSON.stringify(date).slice(1,11)
    setShow(false)
    setDate(dateString)
    dailyData({ dateString })
    setDate(new Date())
    setDisplayDate(dateString)
    
 
  }

  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillBlur={() => { clearData() }} />
      <TextHeader normal='Daily' bold='Data'/>
      <View style={styles.view}>
        <Button mode='contained' style={styles.btn} onPress={() => setShow(!show)} >Select Timeframe</Button>
      <View style={styles.textContainer}>
      
        {showData && <Text style={styles.text}>Data as of: {displayDate}</Text> } 
      </View>
      
      {show && ( <DateTimePicker
          testID="dateTimePicker"
          display="default"
          value={new Date()}
          onChange={onChange} /> )}
       {error ? <Text style={styles.textError}>No data found! Try another date.</Text> : null}
       
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      
        <View style={styles.graphView} >
        
        { (data && showData && !error) ? <LineChart 
          data={{ datasets: [{ data: data }]}} 
          width={850}
          height={340}  
          yAxisSuffix="V" 
          yAxisInterval={1000} 
          chartConfig={chartProps}
          bezier
          withInnerLines={false}
          style={{ marginTop:10, borderRadius: 16,shadowColor: "#000", shadowOffset: { width: 0, height: 3, },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7, }}/> : <ContentLoader 
            speed={1}
            width={340}
            height={700}
            viewBox="0 0 340 700"
            backgroundColor="#f5f5f5"
            foregroundColor="#e8e8fd">
            <Rect x="176" y="251" rx="100" ry="100" width="1" height="1" /> 
            <Rect x="108" y="138" rx="100" ry="100" width="2" height="2" /> 
            <Rect x="10" y="30" rx="50" ry="50" width="320" height="266" /> 
            <Rect x="10" y="370" rx="0" ry="0" width="320" height="95" />
          </ContentLoader> }
            
        </View>
        
      </ScrollView>
      
      </View>
      <View>
        { (data && showData && !error) && <Analytics heartRate={BPM} rInterval={(secondIndex-firstIndex)*0.004}  />  }
        
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
    marginLeft: 20,
  },
  textError: {
    marginTop: 10,
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#6200ee'
  }
  

})

export default Daily
