import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const TodaysTask = ({task,index,onClickDone}) => {
  return (
    <View style={{flexDirection:'row',gap:15,borderBottomWidth:1}}>
      <View style={StyleSheet.title}><Text>{task.title}</Text></View>
      <View>
        {task.isMeasurable===true?
          (
            <View></View>
          )
          :
          (
            <View style={{cursor:'pointer'}} onClick={()=>onClickDone(index)}>
              {task.isDone===true?
                <Entypo name="check" size={24} color="green" style={styles.shadow}/>:
                <Entypo name="cross" size={24} color="gray" style={styles.shadow}/>
              }
            </View>
          )
        }
      </View>
    </View>
  )
}

export default TodaysTask

const styles = StyleSheet({
  title:{
    color: 'crimson'
  },
  shadow: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 }
  }
})