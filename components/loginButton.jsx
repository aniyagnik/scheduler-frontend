import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
const LoginButton = ({title,iconName,onPress}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
				style={styles.loginButton}
        onPress={onPress}
			>
        <View style={{
          backgroundColor:'crimson',
          height:30,
          width:30,
          borderRadius:30,
          justifyContent:'center',
          right:20
        }}>
          <Entypo 
            style={{display:'flex',justifyContent:'center'}} 
            name={iconName} 
            size={15} 
            color="white"
          />
        </View>
      	<Text style={styles.text}>login using {title}</Text>
			</TouchableOpacity>
    </View>
  )
}

export default LoginButton

const styles = StyleSheet.create({
	loginButton: {
    justifyContent:'center',
    flexDirection:'row',
    paddingHorizontal:40,
    paddingVertical:5,
    borderRadius:5,
    borderColor:'black',
    backgroundColor:'white',
    margin:10
	},
  text:{
    display: 'flex',
    alignSelf: 'center',
    fontWeight:'bold',
    fontSize: 15,
    color: 'black',
  }
})