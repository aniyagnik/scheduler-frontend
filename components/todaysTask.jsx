import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import { Link } from 'expo-router';

const TodaysTask = ({task,index,showModal,toggleCheck}) => {
  return (
    <View style={{flexDirection:'row',paddingVertical:5,paddingHorizontal:10,borderBottomWidth:1,justifyContent:'center'}}>
      <View style={styles.title}><Text style={{fontSize:17}}>{task.title}</Text></View>
      <View>
        {task.isMeasurable?
          (
              <Progress.Circle 
                onClick={()=>showModal(index)} 
                style={{cursor:'pointer'}}
                progress={task.score/task.target} 
                thickness={3} 
                textStyle={{fontSize:9}} 
                showsText={true} 
                size={30}
              />
          )
          :
          (
            <TouchableOpacity  onPress={()=>toggleCheck(index)}>
            <View style={{cursor:'pointer'}}>
              {task.isDone?
                <Entypo name="check" size={24} color="green" style={styles.shadow}/>:
                <Entypo name="cross" size={24} color="gray" style={styles.shadow}/>
              }
            </View>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  )
}

export default TodaysTask

const styles = StyleSheet.create({
  title:{
    width:'80%'
  },
  shadow: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 }
  }
})