import React, { useState, useContext } from 'react'
import { NavigationEvents } from 'react-navigation'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import TextHeader from '../components/TextHeader'
import { TextInput } from 'react-native-paper'
import DataContext from '../context/dataContext'
import chartProps, { style } from '../chartConfig/chartProps'
import { LineChart } from 'react-native-chart-kit'
import Analytics from '../components/Analytics'
import ContentLoader, { Rect } from "react-content-loader/native"
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'

const Monthly = ({ navigation }) => {


  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [rInterval, setRinterval] = useState([])

  const { state, monthlyData, clearData } = useContext(DataContext)
  const { data, showData, error, secondIndex, firstIndex, BPM, breathingRate } = state
  

  const inputValidator = ({ month, year }) => {
    setLoading(!loading)
    const input = `${year}-${month}`
    monthlyData({ input })
    
  }

  return (
    <View style={{flex: 1}}>
      <TextHeader normal='Monthly' bold='Data'/>
      <NavigationEvents onWillBlur={() => { clearData() }} />
      <View style={styles.view}>
        <TextInput style={{ marginTop: 12, width: 150 }} mode='outlined' placeholder='Ex. 01 for Jan' label='Enter a month' value={month} onChangeText={month => setMonth(month)}/>
        <TextInput style={{ marginTop: 12, width: 150 }} mode='outlined' placeholder='Ex. 2021' label='Enter a Year' value={year} onChangeText={year => setYear(year)}/>
      </View> 
      <View style={styles.btnView}>
        <Button mode='contained' style={styles.btn} onPress={() => inputValidator({ month, year }) }>Calculate!</Button>
      </View>
      <View style={styles.message}>
          {error ? <Text style={styles.err}>No data for selected month! Try Again!</Text> : null}
        </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ReactNativeZoomableView 
          minZoom={1}
          maxZoom={1.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true} 
          style={styles.graphView}>
          { (data && !error && showData) ? <LineChart 
            data={{datasets: [{ data: data }]}} 
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
            elevation: 7, }}/> : <ContentLoader 
            speed={1}
            width={340}
            height={700}
            viewBox="0 0 340 700"
            backgroundColor="#f5f5f5"
            foregroundColor="#e8e8fd">
            <Rect x="176" y="251" rx="100" ry="100" width="1" height="1" /> 
            <Rect x="108" y="138" rx="100" ry="100" width="2" height="2" /> 
            <Rect x="50" y="170" rx="50" ry="50" width="280" height="266" /> 
            <Rect x="50" y="460" rx="0" ry="0" width="280" height="95" />
          </ContentLoader>} 
            
        </ReactNativeZoomableView>
       
      </ScrollView>
         {(data && !error && showData) && <Analytics 
         rInterval={(secondIndex - firstIndex)*0.004} 
         heartRate={Math.floor(BPM)}
         breathingRate={Math.floor(breathingRate*60)} />} 
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
    borderRadius: 15,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 30,
   
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
