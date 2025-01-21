import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const HabitFrequency = () => {
  const frequency = ["Daily", "Weekly", "Monthy"];
  return (
    <View style={styles.slide1}>
      <Text style={styles.heading}>how frequently you want to do it </Text>
      <label>
        {frequency.map((item) => (
          <View style={styles.frequency} key={item}>
            <input type="radio" name="habitFrequency" id={item} value={item} />
            <label style={styles.freqLabel} htmlFor={item}>{item}</label>
          </View>
        ))}
      </label>
    </View>
  );
};

export default HabitFrequency;

const styles = StyleSheet.create({
	heading: {
    color: "whitesmoke",
    paddingVertical:5,
    backgroundColor:'blue',
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "unicase",
    borderTopLeftRadius: 40,
  },
  frequency: {
    gap:5,
    paddingVertical: 10,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  freqLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  taskIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
  },
  tasks: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "center",
  },
  taskDetail: {},
});
