import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import TextHeader from '../components/TextHeader'
import { TextInput } from 'react-native-paper'
import { Dimensions } from "react-native"
import DataContext from '../context/dataContext'


const Monthly = ({ navigation }) => {

  const screenWidth = Dimensions.get('window').width

  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)

  const { state, monthlyData } = useContext(DataContext)
  
  const inputValidator = ({ month, year }) => {
    setLoading(!loading)
    const input = `${year}-${month}`
    monthlyData({ input })
  }

  return (
    <View style={{flex: 1}}>
      <TextHeader normal='Monthly' bold='Data'/>
      <View style={styles.view}>
      <TextInput style={{ marginTop: 20, width: 150 }} mode='outlined' placeholder='Ex. 01 for Jan' label='Enter a month' value={month} onChangeText={month => setMonth(month)}/>
      <TextInput style={{ marginTop: 20, width: 150 }} mode='outlined' placeholder='Ex. 2021' label='Enter a Year' value={year} onChangeText={year => setYear(year)}/>
      </View> 
      <View style={styles.btnView}>
      <Button mode='contained' style={styles.btn} onPress={() => inputValidator({ month, year }) } loading={loading}>Calculate Data</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10
  },
  btn: {
    backgroundColor: '#4B51FF',
    padding: 5,
    marginBottom: 10,
   
  },
  btnView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25
  }
 
})

export default Monthly
