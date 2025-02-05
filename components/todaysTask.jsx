import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

const TodaysTask = ({ task, index, showModal, toggleCheck }) => {
  const date = new Date().toDateString().split(" ").slice(1, 3).reverse();
  let streak = task.taskReport.slice(1, 8);
  streak = streak.map((item, index) => {
    return {
      ...item,
      date: parseInt(date[0]) - (index + 1).toString(),
      month: date[1],
    };
  });
  console.log(streak);
  return (
    <View style={styles.task}>
      <View style={styles.todayTaskBox}>
        <View style={styles.title}>
          <Text style={{ fontSize: 17 }}>{task.title}</Text>
        </View>
        <View>
          {task.isMeasurable ? (
            task.taskReport[0].workDone / task.target < 1 ? (
              <Progress.Circle
                animated={false}
                onClick={() => showModal(index)}
                style={{ cursor: "pointer" }}
                progress={task.taskReport[0].workDone / task.target}
                thickness={3}
                textStyle={{ fontSize: 9 }}
                showsText={true}
                size={30}
              />
            ) : (
              <AntDesign
                onClick={() => showModal(index)}
                name="checkcircle"
                size={28}
                color="green"
              />
            )
          ) : (
            <TouchableOpacity onPress={() => toggleCheck(index)}>
              <View style={{ cursor: "pointer" }}>
                {task.isDone ? (
                  <Entypo name="check" size={24} color="green" />
                ) : (
                  <Entypo name="cross" size={24} color="gray" />
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Link href="/statistics">
          <Ionicons name="stats-chart" size={24} color="black" />
        </Link>
      </View>
      <View style={styles.streak}>
        {streak.map((item, index) => (
          <View
            style={[
              styles.streakItem,
              {
                backgroundColor:
                  index % 2 == 0 ? "rgb(118, 255, 143)" : "rgb(246, 250, 122)",
              },
            ]}
            key={item.date}
          >
            <Text style={{ fontSize: 13, alignSelf: "center" }}>
              {item.workDone ? (
                item.workDone
              ) : (
                <Entypo
                  name={item.isDone ? "check" : "cross"}
                  size={15}
                  color={item.isDone ? "green" : "gray"}
                />
              )}
            </Text>
            <View style={styles.date}>
              <Text
                style={{ alignSelf: "center", fontSize: 12, lineHeight: 5 }}
              >
                {item.date}
              </Text>
              <Text style={{ alignSelf: "center", fontSize: 12 }}>
                {item.month}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TodaysTask;

const styles = StyleSheet.create({
  task: {
    backgroundColor: "gold",
    marginBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    boxShadow: "inset -4px -4px 2px gray",
    borderRadius: 20,
    backgroundColor: "white",
  },
  todayTaskBox: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
  },
  title: {
    width: "70%",
  },
  streak: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignContent: "center",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  streakItem: {
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingTop: 4,
    backgroundColor: "whitesmoke",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderRadius: 10,
    width: 40,
    boxShadow: "0px 0px 3px gray",
  },
  date: {
    width: "90%",
    paddingTop: 7,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgb(255, 255, 255)",
    opacity: 0.6,
    borderRadius: 5,
  },
});
