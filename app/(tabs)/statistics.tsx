import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import React, { useState } from "react";
import { ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import TaskInfoTable from '@/components/taskInfoTable'
import TaskHistorGraph from '@/components/taskHistoryGraph'
export default function Statistics() {
  
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
    year: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
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
          <TaskInfoTable/>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Report</Text>
          <TaskHistorGraph chartConfig={chartConfig} data={reportData} onPress={handleXView}/>
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
