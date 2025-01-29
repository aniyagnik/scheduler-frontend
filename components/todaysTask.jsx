import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";

const TodaysTask = ({ task, index, showModal, toggleCheck }) => {
  const streak = [
    {
      date: "21",
      month: "feb",
      value: "12:00",
    },
    {
      date: "20",
      month: "feb",
      value: "12:00",
    },
    {
      date: "19",
      month: "feb",
      value: "12:00",
    },
    {
      date: "18",
      month: "feb",
      value: "12:00",
    },
    {
      date: "17",
      month: "feb",
      value: "12:00",
    },
    {
      date: "16",
      month: "feb",
      value: "12:00",
    },
    {
      date: "15",
      month: "feb",
      isDone: false,
    },
  ];
  return (
    <View style={styles.task}>
      <View style={styles.todayTaskBox}>
        <View style={styles.title}>
          <Text style={{ fontSize: 17 }}>{task.title}</Text>
        </View>
        <View>
          {task.isMeasurable ? (
            task.score / task.target < 1 ? (
              <Progress.Circle
                animated={false}
                onClick={() => showModal(index)}
                style={{ cursor: "pointer" }}
                progress={task.score / task.target}
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
                  <Entypo
                    name="check"
                    size={24}
                    color="green"
                    style={styles.shadow}
                  />
                ) : (
                  <Entypo
                    name="cross"
                    size={24}
                    color="gray"
                    style={styles.shadow}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
        <AntDesign
          name="caretdown"
          size={24}
          color={task.subTasks.length == 0 ? "gray" : "black"}
        />
      </View>
      <View style={styles.streak}>
        {streak.map((item,index) => (
          <View
            style={[styles.streakItem, { backgroundColor: index%2==0?"rgb(248, 222, 222)":"rgb(255, 225, 225)" }]}
            key={item.date}
          >
            <Text style={{ fontSize: 11, alignSelf: "center" }}>
              {item.value ? (
                item.value
              ) : (
                <Entypo
                  name={item.isDone ? "check" : "cross"}
                  size={15}
                  color={item.isDone ? "green" : "gray"}
                  style={styles.shadow}
                />
              )}
            </Text>
            <View style={styles.date}>
              <Text style={{ fontSize: 9, lineHeight: 5 }}>{item.date}</Text>
              <Text style={{ fontSize: 9 }}>{item.month}</Text>
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
  shadow: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 },
  },
  streak: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  streakItem: {
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 4,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    width: 40,
    boxShadow: "0px 0px 3px gray",
  },
  date: {
    padding:2,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgb(255, 255, 255)",
    opacity: 0.6,
    borderRadius: 5,
  },
});
