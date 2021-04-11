import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons, Fontisto, MaterialCommunityIcons } from 'react-native-vector-icons'


const Analytics = ({heartRate, rInterval, breathingRate}) => {

 
  return (
    <View style={styles.analyticView}>
     
      <View style={styles.aligner}>
        <Ionicons style={{ fontSize: 30, color: '#6200ee' }} name='heart' />
        <Text style={{ fontSize: 12 }}>BPM: {heartRate}</Text>
      </View>
      <View style={styles.aligner}>
        <MaterialCommunityIcons style={{ fontSize: 30, color: '#6200ee' }} name='lungs' />
        <Text style={{ fontSize: 12, marginLeft: 10 }}>Breathing Rate: {breathingRate}</Text>
      </View>
      <View style={styles.aligner}> 
        <Fontisto style={{ fontSize: 30, color: '#6200ee' }} name='heartbeat-alt' />
        <Text style={{ fontSize: 12 }}>R-R: {rInterval}s </Text>
      </View>
      </View>
   
  )
}

const styles = StyleSheet.create({

  analyticView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height:100,
    width:380,
    marginBottom:15,
    marginLeft:14,
    borderRadius:5,
    borderTopColor: '#000',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 3,
  },
  iconDisplay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  aligner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center'
  }

})

export default Analytics
