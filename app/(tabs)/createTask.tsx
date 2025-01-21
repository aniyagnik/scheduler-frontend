import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TaskType from "@/components/taskType";
import TaskDetails from "@/components/taskDetails";
import HabitFrequency from "@/components/habitFrequency";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CreateTask() {
  const [slideNumber, setSlideNumber] = useState(1);

  const handleNavigation = (change: number) => {
    console.log(slideNumber + change);
    if (slideNumber + change > 3 || slideNumber + change < 1) return;
    else setSlideNumber(slideNumber + change);
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.dashboard}>
        {slideNumber === 1 ? (
          <TaskType />
        ) : slideNumber === 2 ? (
          <TaskDetails />
        ) : slideNumber === 3 ? (
          <HabitFrequency />
        ) : slideNumber === 4 ? (
          <></>
        ) : (
          <></>
        )}
        <View style={styles.navigation}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.loginButton}
            onPress={() => handleNavigation(-1)}
          >
            <MaterialIcons
              style={{ display: "flex", justifyContent: "center" }}
              name="arrow-back-ios"
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.loginButton}
            onPress={() => handleNavigation(+1)}
          >
            <MaterialIcons
              style={{ display: "flex", justifyContent: "center" }}
              name="arrow-forward-ios"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    display: "flex",
    flexDirection: "column",
    height: 800,
    justifyContent: "space-around",
    padding: 20,
    gap: 20,
    backgroundColor: "white",
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "crimson",
    margin: 10,
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  wrapper: {
    backgroundColor: "crimson",
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: "center",
    right: 20,
  },
  text: {
    display: "flex",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },
});

// const fields = [
// 	{id:'title',placeholder:'enter task name'},
// 	{id:'description',placeholder:'enter description'},
// 	{id:'unit',placeholder:'enter units'},
// 	{id:'target',placeholder:'set target to achieve'},
// 	{id:,placeholder:}
// ]
