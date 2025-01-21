import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const TaskType = () => {
  const taskTypes = [
    {
      name: "habits",
      details: "Repeatable activities",
      icons: <Feather name="repeat" size={24} color="blue" />,
    },
    {
      name: "Task",
      details: "One time activity",
      icons: <AntDesign name="check" size={24} color="blue" />,
    },
  ];
  return (
    <View style={styles.slide1}>
      {taskTypes.map((item) => (
        <View style={styles.taskType} key={item.name}>
          <View style={styles.taskIcon}>{item.icons}</View>
          <View style={styles.tasks}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDetail}>{item.details}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TaskType;

const styles = StyleSheet.create({
  slide1: {
    marginTop: 20,
  },
  taskType: {
    paddingVertical: 10,
    borderRadius: "20px",
    borderBottomWidth: 1,
    boxShadow: "0px 0px 5px 2px blue",
    borderColor: "green",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
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
  taskName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  taskDetail: {},
});
