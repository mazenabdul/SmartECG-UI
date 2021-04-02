import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import TextHeader from '../components/TextHeader'
import { TextInput } from 'react-native-paper'
import { Dimensions } from "react-native"
import DataContext from '../context/dataContext'
import chartProps, { style } from '../chartConfig/chartProps'
import { LineChart } from 'react-native-chart-kit'
import Analytics from '../components/Analytics'


const Monthly = ({ navigation }) => {


  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)

  const { state, monthlyData } = useContext(DataContext)
  
  const inputValidator = ({ month, year }) => {
    setLoading(!loading)
    const input = `${year}-${month}`
    monthlyData({ input })
  }

  console.log(state.data)
  return (
    <View style={{flex: 1}}>
      <TextHeader normal='Monthly' bold='Data'/>
      <View style={styles.view}>
        <TextInput style={{ marginTop: 12, width: 150 }} mode='outlined' placeholder='Ex. 01 for Jan' label='Enter a month' value={month} onChangeText={month => setMonth(month)}/>
        <TextInput style={{ marginTop: 12, width: 150 }} mode='outlined' placeholder='Ex. 2021' label='Enter a Year' value={year} onChangeText={year => setYear(year)}/>
      </View> 
      <View style={styles.btnView}>
        <Button mode='contained' style={styles.btn} onPress={() => inputValidator({ month, year }) }>Calculate!</Button>
      </View>
      <View style={styles.message}>
          {state.data.sum === undefined || state.data.sum.length===0 && <Text style={styles.err}>No data for selected month! Try Again!</Text>}
        </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.graphView}>
          { state.data.sum !== undefined && state.data.sum.length>0  &&  <LineChart 
          data={{datasets: [{ data: state.data.sum }]}} 
          width={600}
          height={300}  
          yAxisSuffix="V" 
          yAxisInterval={1} 
          chartConfig={chartProps}
          bezier
          withInnerLines={false}
          style={{ 
            marginTop:30, borderRadius: 16,shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7, }}/>} 
            
        </View>
       
      </ScrollView>
        {state.data.sum !== undefined && state.data.sum.length>0 && <Analytics /> }
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    
  },
  btn: {
    backgroundColor: '#6200ee',
    padding: 5,
    marginTop: 12
   
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  text: {
    marginHorizontal: 30,
    fontSize: 17,
    marginTop: 10,
    fontStyle: 'italic'
  },
  err: {
    fontSize: 17,
    fontStyle: 'italic',
    
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  graphView:{
    padding: 10,
  },
 
})

export default Monthly
