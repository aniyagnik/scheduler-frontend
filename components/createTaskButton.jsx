import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CreateTaskButton = () => {
  return (
    <View>
    <Link href='/createTask'>
      <TouchableOpacity
        activeOpacity={0.7}
				style={styles.createTaskButton}
			>
				<MaterialIcons
					style={{display:'flex',justifyContent:'center'}} 
					name='add'
					size={20} 
					color="black"
				/>
      <Text style={styles.text}>add Task</Text>
			</TouchableOpacity>
    </Link></View>
  )
}

export default CreateTaskButton

const styles = StyleSheet.create({
	createTaskButton: {
    justifyContent:'space-around',
    flexDirection:'row',
    paddingHorizontal:20,
    paddingVertical:2,
    borderBottomWidth: 1,
    backgroundColor:'white',
    margin:10,
		gap:10
	},
  text:{
    display: 'flex',
    alignSelf: 'center',
    fontWeight:'bold',
    fontSize: 15,
    color: 'black',
  }
})