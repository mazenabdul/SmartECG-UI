import React, { useState, useContext } from "react"
import { NavigationEvents } from 'react-navigation'
import { StyleSheet, View, Text, ScrollView } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import TextHeader from '../components/TextHeader'
import { Button } from 'react-native-paper'
import { TouchableOpacity } from "react-native-gesture-handler"
import DataContext from '../context/dataContext'
import { LineChart } from "react-native-chart-kit"
import chartProps from '../chartConfig/chartProps'
import Analytics from '../components/Analytics'
import ContentLoader, { Rect } from "react-content-loader/native"

const Weekly  = () => {

  //Consume context from provider
  const { state, weeklyData, clearData } = useContext(DataContext)
  const { data, error, showData, secondIndex, firstIndex, BPM } = state

  //Start date state
  const [startDate, setStartDate] = useState(new Date())
  const [showStart, setShowStart] = useState(false)

  //End date state
  const [endDate, setEndDate] = useState(new Date())
  const [showEnd, setShowEnd] = useState(false)

  //Handler for changing and showing start date 
  const changeStart = (event, date) => {
      setShowStart(false)
      const startDateString = JSON.stringify(date).slice(1,11)
      setStartDate(date)
      
  }

  //Handler for changing and showing end date
  const changeEnd = (event, date) => {
    setShowEnd(false)
    const endDateString = JSON.stringify(date).slice(1,11)
    setEndDate(date)
  }

  return (

    <View style={{ flex: 1 }}>
      <NavigationEvents onWillBlur={() => { clearData() }} />
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
          {error ? <Text style={styles.text}>No data found! Try again</Text> : null}
        </View>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.graphView}>
      { (data && !error && showData) ?  <LineChart 
        data={{ datasets: [{ data: data}]}} 
        width={850}
        height={310}  
        yAxisSuffix="V" 
        yAxisInterval={1} 
        chartConfig={chartProps}
        bezier
        withInnerLines={false}
        style={{ marginTop:0,   borderRadius: 16,shadowColor: "#000", shadowOffset: { width: 0, height: 3 },
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
        <Rect x="55" y="15" rx="50" ry="50" width="280" height="266" /> 
        <Rect x="50" y="330" rx="0" ry="0" width="320" height="95" />
      </ContentLoader>  }
      </View>
    </ScrollView>
    <View>
      {(data && !error && showData) && <Analytics heartRate={Math.floor(BPM)} rInterval={(secondIndex - firstIndex)*0.004} /> }
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
    color: '#6200ee',
    fontWeight: 'bold'
    
  },
  err: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20

  },
  analyticContainer:{
    marginTop: 0
  }
  
});

export default Weekly