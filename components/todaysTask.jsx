import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';

const TodaysTask = ({task,index,showModal,toggleCheck}) => {
  return (
    <View style={styles.todayTaskBox}>
      <View style={styles.title}><Text style={{fontSize:17}}>{task.title}</Text></View>
      <View>
        {task.isMeasurable?
          (
            task.score/task.target<1?(
              <Progress.Circle 
                animated={false}
                onClick={()=>showModal(index)} 
                style={{cursor:'pointer'}}
                progress={task.score/task.target} 
                thickness={3} 
                textStyle={{fontSize:9}} 
                showsText={true} 
                size={30}
              />
            ):(
              <AntDesign name="checkcircle" size={28} color="green" />
            )
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
  todayTaskBox:{
    flexDirection:'row',
    paddingVertical:5,
    paddingHorizontal:10,
    justifyContent:'center',
    backgroundColor:'white',
    marginBottom:10,
    borderRadius:20,
    boxShadow:'inset -4px -4px 2px gray'
  },
  title:{
    width:'80%'
  },
  shadow: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 }
  }
})