import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { BarChart,ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { ContributionChartValue } from "react-native-chart-kit/dist/contribution-graph/ContributionGraph";
import { RectProps } from "react-native-svg";

export default function Statistics() {
  const tableData = [
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
      streakText: "best",
      StreakTime: "28/12/23 to 25/1/24",
    },
    {
      streakDays: 1,
      streakText: "current",
      StreakTime: "30/1/25",
    },
  ];
  const data = {
    labels: Array.from(Array(30)).map((e, i) => (i + 1).toString()),
    datasets: [
      {
        data: Array.from(Array(30)).map(() => Math.floor(Math.random() * 10)),
        color: (opacity = 1) => `rgba(34, 65, 244, ${opacity})`, // optional
      },
    ],
  };
  const commitsData = [
    { date: "2025-01-02", count: 1 },
    { date: "2025-01-03", count: 2 },
    { date: "2025-01-04", count: 3 },
    { date: "2025-01-05", count: 4 },
    { date: "2025-01-06", count: 5 },
    { date: "2025-01-30", count: 2 },
    { date: "2025-01-31", count: 3 },
    { date: "2025-03-01", count: 2 },
    { date: "2025-02-02", count: 4 },
    { date: "2025-02-05", count: 2 },
    { date: "2025-02-30", count: 4 }
  ];
  const chartConfig = {
    backgroundGradientFrom: "whitesmoke",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "whitesmoke",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0.5) => `rgba(55, 0, 0, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.3,
    barRadius: 10,

    useShadowColorFromDataset: false, // optional
  };
  const handleCalenderPress = () => {
    alert('calender cell clicked')
  }
  const handleToolTip:any={}
  const screenWidth = Dimensions.get("window").width;
  return (
    <ScrollView style={{ flex: 1,paddingVertical:10 }}>
      <View style={styles.statistics}>
        <View style={styles.streakStat}>
          <View style={styles.title}>Streak</View>
          {streakInfo.map((item, index) => (
            <View style={styles.streakBox} key={index}>
              <Text style={styles.streakNumber}>{item.streakDays}</Text>
              <Text style={styles.text}>{item.streakText}</Text>
              <Text style={styles.text}>{item.StreakTime}</Text>
            </View>
          ))}
        </View>
        <ScrollView>
          <View style={styles.table}>
            <View
              style={[styles.row, { backgroundColor: "gold", borderWidth: 0 }]}
            >
              <Text style={[styles.col, { minWidth: "20%" }]}>Date</Text>
              <Text style={[styles.col, { minWidth: "20%" }]}>score</Text>
              <Text style={[styles.col, { minWidth: "60%" }]}>remarks</Text>
            </View>
            {tableData.map((row, index) => (
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
                <Text style={[styles.col, { minWidth: "20%" }]}>
                  {row.date}
                </Text>
                <Text style={[styles.col, { minWidth: "20%" }]}>
                  {row.score ? (
                    row.score
                  ) : (
                    <Entypo
                      name={row.isDone ? "check" : "cross"}
                      size={24}
                      color={row.isDone ? "green" : "gray"}
                    />
                  )}
                </Text>
                <Text
                  style={[
                    styles.col,
                    {
                      minWidth: "60%",
                      maxWidth: "60%",
                    },
                  ]}
                >
                  {row.remarks}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.chart}>
          <BarChart
            data={data}
            width={data.datasets[0].data.length * 20}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            showBarTops={false}
            fromZero={true}
          />
        </View>
        <View style={styles.calender}>
        <ContributionGraph
          values={commitsData}
          endDate={new Date("2025-03-01")}
          numDays={105}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig} 
          tooltipDataAttrs={(value)=>handleToolTip}    
          onDayPress={handleCalenderPress}
        />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statistics: {
    display: "flex",
    flexDirection: "column",
    height: 900,
    justifyContent: "space-around",
    padding: 20,
    gap: 20,
  },
  table: {
    minWidth: "100%",
    width: "auto",
    overflowY: "scroll",
    justifyContent: "flex-start",
    alignContent: "stretch",
  },
  col: {
    padding: 10,
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
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
    backgroundColor: "rgb(220,220,220)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    height: 150,
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
    minHeight: "50%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    color: "crimson",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  chart: {
    maxWidth: "100%",
    overflowX: "scroll",
  },
  calender: {
    maxWidth: "100%",
    overflowX: "scroll",
  },
});

// const fields = [
// 	{id:'title',placeholder:'enter task name'},
// 	{id:'description',placeholder:'enter description'},
// 	{id:'unit',placeholder:'enter units'},
// 	{id:'target',placeholder:'set target to achieve'},
// 	{id:,placeholder:}
// ]
