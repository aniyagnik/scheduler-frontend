import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { BarChart, ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";

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
    { date: "2025-02-30", count: 4 },
  ];


  const labels = {
    week: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    month: Array.from(Array(30)).map((e, i) => (i + 1).toString()),
    year: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const barWidthValue = [1,0.2,0.5]
  const [chartDatasets, setChartDatasets] = useState(Array.from(Array(30)).map(() => Math.floor(Math.random() * 10)));
  const [chartLabels, setChartLabels] = useState(labels.month);
  const [barWidth,setBarWidth] = useState(barWidthValue[1])

  const chartConfig = {
    backgroundGradientFrom: "whitesmoke",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "whitesmoke",
    backgroundGradientToOpacity: 0.5,
    color: (opacity=1) => `rgba(159, 31, 31,${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: barWidth,
    barRadius: 10,
    propsForBackgroundLines: {
      strokeDasharray: "",
      strokeOpacity: 0.0
  },
    propsForVerticalLabels:{},
    useShadowColorFromDataset: false, // optional
  };

  const handleCalenderPress = () => {
    alert("calender cell clicked");
  };

  const handleToolTip: any = {};
  const screenWidth = Dimensions.get("window").width;
  
  const reportData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartDatasets,
        color: (opacity = 1) => `rgba(34, 65, 244, ${opacity})`, // optional
      },
    ],
  };

  const handleXView = (value: string) => {
    switch (value) {
      case "Week": {
        setChartLabels(labels.week);
        setChartDatasets(Array.from(Array(7)).map((e, i) => Math.floor(Math.random() * 10)));
        setBarWidth(barWidthValue[0])
        break;
      }
      case "Month": {
        setChartLabels(labels.month);
        setChartDatasets(
          Array.from(Array(30)).map((e, i) => Math.floor(Math.random() * 10))
        );
        setBarWidth(barWidthValue[1])
        break;
      }
      case "Year": {
        setChartLabels(labels.year);
        setChartDatasets(Array.from(Array(12)).map((e, i) => Math.floor(Math.random() * 3000)));
        setBarWidth(barWidthValue[2])
        break;
      }
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.statistics}>
        <View style={styles.container}>
          <Text style={styles.containerTitle}></Text>
          <View style={styles.streakStat}>
            <Text style={styles.title}>Streak</Text>
            {streakInfo.map((item, index) => (
              <View style={styles.streakBox} key={index}>
                <Text style={styles.streakNumber}>{item.streakDays}</Text>
                <Text style={styles.text}>{item.streakText}</Text>
                <Text style={styles.text}>{item.StreakTime}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Task Info</Text>
          <ScrollView>
            <View style={styles.table}>
              <View
                style={[
                  styles.row,
                  { backgroundColor: "crimson", borderWidth: 0 },
                ]}
              >
                <Text
                  style={[
                    styles.col,
                    { color: "white", minWidth: "20%", fontWeight: "bold" },
                  ]}
                >
                  Date
                </Text>
                <Text
                  style={[
                    styles.col,
                    { color: "white", minWidth: "20%", fontWeight: "bold" },
                  ]}
                >
                  score
                </Text>
                <Text
                  style={[
                    styles.col,
                    { color: "white", minWidth: "60%", fontWeight: "bold" },
                  ]}
                >
                  remarks
                </Text>
              </View>
              <View
                style={{
                  maxHeight: 210,
                  overflowY: "scroll",
                }}
              >
                {tableData.map((row, index) => (
                  <View
                    style={[
                      styles.row,
                      {
                        backgroundColor:
                          index % 2 == 0
                            ? "rgb(210, 210, 210)"
                            : "rgb(240, 240, 240)",
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
            </View>
          </ScrollView>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Report</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignContent: "center",
            }}
          >
            {["Week", "Month", "Year"].map((item) => (
              <TouchableOpacity onPress={() => handleXView(item)} key={item}>
                <View
                  style={{
                    marginBottom: 10,
                    paddingVertical: 5,
                    width: screenWidth / 5,
                    backgroundColor: "crimson",
                    justifyContent: "center",
                    alignContent: "center",
                    borderRadius: 20,
                    boxShadow:'2px 0px 5px 0px gray'
                  }}
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.chart}>
            <BarChart
              data={reportData}
              width={0.95*screenWidth}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={chartConfig}
              showBarTops={false}
              fromZero={true}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Calender</Text>
          <View style={styles.calender}>
            <ContributionGraph
              values={commitsData}
              endDate={new Date("2025-03-21")}
              numDays={105}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              tooltipDataAttrs={(value) => handleToolTip}
              onDayPress={handleCalenderPress}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statistics: {
    display: "flex",
    flexDirection: "column",
    height: 1000,
    justifyContent: "flex-start",
    padding: 5,
    gap: 5,
    backgroundColor: "white",
  },
  container: {
    borderRadius: 5,
    backgroundColor: "rgb(220,220,220)",
    padding: 10,
  },
  containerTitle: {
    color: "rgb(154, 0, 90)",
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    minWidth: "100%",
    width: "auto",
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
    display: "flex",
    minWidth: "100%",
    maxHeight: "20%",
    justifyContent: "center",
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
  buttonText: {
    display: "flex",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
  },
});

// const fields = [
// 	{id:'title',placeholder:'enter task name'},
// 	{id:'description',placeholder:'enter description'},
// 	{id:'unit',placeholder:'enter units'},
// 	{id:'target',placeholder:'set target to achieve'},
// 	{id:,placeholder:}
// ]
