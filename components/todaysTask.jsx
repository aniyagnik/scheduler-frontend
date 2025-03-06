import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as Progress from "react-native-progress";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import {getColour} from "@/utility/index"

const TodaysTask = ({ task, index, showModal }) => {
  let date = new Date();
  let streak = task?task.taskReport.slice(1, 8):[];
  streak = streak.map((item) => {
    const d = new Date(item.date)
    return {
      ...item,
      date: d.getDate(),
      month: d.toDateString().slice(4,7),
    };
  });
  return (
    <View style={styles.task}>
      <View style={styles.todayTaskBox}>
        <View style={styles.title}>
          <Text
            style={{ fontSize: 17, fontWeight: "bold", color: task?task.colour:"rgb(120,120,120)" }}
          >
            {task?task.title:"Loading..."} 
            {
              task?task.isMeasurable?` (in ${task.unit})`:'':''
            }
          </Text>
        </View>
        <View>
          {task?task.isMeasurable ? (
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
            <TouchableOpacity onPress={() => showModal(index)}>
              <View style={{ cursor: "pointer" }}>
                {task.taskReport[0].isDone ? (
                  <Entypo name="check" size={24} color="green" />
                ) : (
                  <Entypo name="cross" size={24} color="gray" />
                )}
              </View>
            </TouchableOpacity>
          ):(
            <AntDesign name="loading1" size={24} color="black" />
          )}
        </View>
        <Link href={{
          pathname:"/statistics",
          params:{id:index}
          }}
        >
          <Ionicons name="stats-chart" size={24} color="black" />
        </Link>
      </View>
      <View style={styles.streak}>
        {streak.map((item) => {
          const colour = getColour(task.isMeasurable, item.isDone,item.workDone,task.target,task.targetType,task.colour)
          const contrastColour = `rgb(${colour.slice(4,colour.length-1).split(",").map(o=>255-o).join()})`
          return(
          <View key={item._id}>
            <View
              style={[
                styles.streakItem,
                {
                  height: Dimensions.get("window").width / 13,
                  width: Dimensions.get("window").width / 13,
                  backgroundColor: colour,
                },
              ]}
            >
              <Text style={{ fontSize: 12,fontWeight:'bold', textShadow:`0px 0px 5px white`,color: contrastColour}}>
                {item.workDone >= 0 ? (
                  item.workDone
                ) : (
                  <Entypo
                    name={item.isDone ? "check" : "cross"}
                    size={20}
                    color={contrastColour}
                  />
                )}
              </Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.dateText}>{item.month}</Text>
            </View>
          </View>
        )})}
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
    boxShadow: "0px 0px 5px 2px gray",
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
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
    boxShadow: "inset 0px 0px 5px 5px darkgray",
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignContent: "center",
    color: "white",
    paddingVertical: 10,
  },
  streakItem: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    boxShadow: "0px 0px 3px gray",
  },
  date: {
    marginTop: 5,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
    borderRadius: 5,
  },
  dateText: {
    color: "rgb(100,100,100)",
    alignSelf: "center",
    fontSize: 12,
    lineHeight: 10,
  },
});
