import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
export default function Statistics() {
  const data = [
    {
      date: "12/12/21",
      score: "2.6",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a notjsdkfhksdjfhe.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
    {
      date: "12/12/21",
      score: "2.2",
      isDone: false,
      remarks: "this is a note.",
    },
  ];
  const streakInfo = [
    {
      streakDays: 20,
      streakText: "Best Streak",
      StreakTime: "from 28/12/23 to 25/1/24",
    },
    {
      streakDays: 1,
      streakText: "Current Streak",
      StreakTime: "from 30/1/25",
    },
  ];
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.statistics}>
        <ScrollView>
          <View style={styles.table}>
            <View
              style={[styles.row, { backgroundColor: "gold", borderWidth: 0 }]}
            >
              <View style={[styles.col, { minWidth: "20%" }]}>Date</View>
              <View style={[styles.col, { minWidth: "20%" }]}>score</View>
              <View style={[styles.col, { minWidth: "60%" }]}>remarks</View>
            </View>
            {data.map((row, index) => (
              <View
                style={[
                  styles.row,
                  {
                    backgroundColor:
                      index % 2 == 0
                        ? "rgb(200, 200, 200)"
                        : "rgb(230, 230, 230)",
                  },
                ]}
                key={index}
              >
                <View style={[styles.col, { minWidth: "20%" }]}>
                  {row.date}
                </View>
                <View style={[styles.col, { minWidth: "20%" }]}>
                  {row.score ? (
                    row.score
                  ) : (
                    <Entypo
                      name={row.isDone ? "check" : "cross"}
                      size={24}
                      color={row.isDone ? "green" : "gray"}
                    />
                  )}
                </View>
                <View
                  style={[
                    styles.col,
                    {
                      minWidth: "60%",
                      maxWidth: "60%",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  {row.remarks}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.streakStat}>
            <View style={styles.title}>Streak</View>
            {streakInfo.map((item,index) => (
              <View style={styles.streakBox} key={index}>
                <View style={styles.streakNumber}>{item.streakDays}</View>
                <View>{item.streakText}</View>
                <View>{item.StreakTime}</View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statistics: {
    display: "flex",
    flexDirection: "column",
    height: 800,
    justifyContent: "space-around",
    padding: 20,
    gap: 20,
    backgroundColor: "whitesmoke",
  },
  table: {
    minWidth: "100%",
    width: "auto",
    maxHeight: "50%",
    overflowY: "scroll",
    justifyContent: "flex-start",
    alignContent: "stretch",
  },
  col: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    wordWrap: "anywhere",
  },
  row: {
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "stretch",
  },
  streakStat: {
    marginTop: 10,
    backgroundColor: "rgb(220,220,220)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    height: 200,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    minWidth: "100%",
    maxHeight: "20%",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  streakBox: {
    minWidth: "50%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  streakNumber: {
    borderWidth: 1,
    minHeight: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

// const fields = [
// 	{id:'title',placeholder:'enter task name'},
// 	{id:'description',placeholder:'enter description'},
// 	{id:'unit',placeholder:'enter units'},
// 	{id:'target',placeholder:'set target to achieve'},
// 	{id:,placeholder:}
// ]
