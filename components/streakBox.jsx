import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const StreakBox = ({streak,colour}) => {
	const from = new Date(streak.from);
	const to = streak.to ? new Date(streak.to) : new Date();
  return (
    <View style={styles.streakBox}>
			<Text style={[styles.streakNumber,{color:colour}]}>
			{
				Math.round((to.getTime() - from.getTime()) / (1000 * 3600 * 24))
			}
			</Text>
			<Text style={[styles.text,{fontWeight:'bold'}]}>{streak.text}</Text>
			<Text style={styles.text}>{from.toLocaleDateString('en-GB')}{streak.to?" - ":""}{streak.to?to.toLocaleDateString('en-GB'):""}</Text>
		</View>
  )
}

export default StreakBox

const styles = StyleSheet.create({
  streakBox: {
    minWidth: "50%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
	streakNumber: {
    minHeight: "50%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
})