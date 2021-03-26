import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import TextHeader from '../components/TextHeader'
import { TextInput } from 'react-native-paper'
import { Dimensions } from "react-native"
import DataContext from '../context/dataContext'
import chartProps, { style } from '../chartConfig/chartProps'
import { LineChart } from 'react-native-chart-kit'


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
        <TextInput style={{ marginTop: 20, width: 150 }} mode='outlined' placeholder='Ex. 01 for Jan' label='Enter a month' value={month} onChangeText={month => setMonth(month)}/>
        <TextInput style={{ marginTop: 20, width: 150 }} mode='outlined' placeholder='Ex. 2021' label='Enter a Year' value={year} onChangeText={year => setYear(year)}/>
      </View> 
      <View style={styles.btnView}>
        <Button mode='contained' style={styles.btn} onPress={() => inputValidator({ month, year }) }>Calculate Data</Button>
      </View>
      <View style={styles.message}>
          {state.data.sum === undefined || state.data.sum.length===0 && <Text style={styles.err}>No data for selected month! Try Again!</Text>}
        </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          { state.data.sum !== undefined && state.data.sum.length>0  &&  <LineChart 
          data={{labels: state.data.time, datasets: [{ data: state.data.sum }]}} 
          width={600}
          height={330}  
          yAxisSuffix="V" 
          yAxisInterval={1} 
          chartConfig={chartProps}
          bezier
          style={{ 
            marginTop:30,   borderRadius: 16,shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7, }}/>} 
            
        </View>
       
      </ScrollView>
      
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
    marginBottom: 10,
   
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
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
  }
 
})

export default Monthly
