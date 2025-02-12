import { View, StyleSheet, ScrollView, Text } from "react-native";
import React, { useContext, useState } from "react";
import { ContributionGraph } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import TaskInfoTable from "@/components/taskInfoTable";
import TaskHistorGraph from "@/components/taskHistoryGraph";
import StreakBox from "@/components/streakBox";
import { UserContext } from "../context/userContext";
import { useLocalSearchParams } from "expo-router";

export default function Statistics() {
  const context = useContext(UserContext);

  if (!context) {
    return <Text>Error: UserContext is undefined</Text>;
  }

  const { user } = context;

  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const task = user?.allTasks[parseInt(id)];
  const [streak, setStreak] = useState(task?.streak);

  let date = new Date();
  date = new Date(date.setDate(date.getDate() + 1));
  const contributionData = task
    ? task.taskReport.map((obj) => {
        date = new Date(date.setDate(date.getDate() - 1));
        return {
          date:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate(),
          count: task?.isMeasurable ? obj.workDone : obj.isDone ? 1 : 0,
        };
      })
    : [];

  const chartConfig = {
    backgroundGradientFrom: "whitesmoke",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "whitesmoke",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) =>
      `rgba(${task?.colour.slice(4, task?.colour.length - 1)},${opacity})`,
    strokeWidth: 1, // optional, default 3
    barRadius: 10,
    propsForBackgroundLines: {
      strokeDasharray: "",
      strokeOpacity: 0.0,
    },
    propsForVerticalLabels: {},
    useShadowColorFromDataset: false, // optional
  };

  const handleCalenderPress = () => {
    alert("calender cell clicked");
  };

  const handleToolTip: any = {};
  const screenWidth = Dimensions.get("window").width;

  const handleXView = (value: string) => {
    switch (value) {
      case "Week": {
        break;
      }
      case "Month": {
        break;
      }
      case "Year": {
        break;
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.statistics}>
        <View
          style={[
            styles.container,
            {
              alignSelf: "center",
              width: "95%",
              zIndex: 1,
              boxShadow: "0px 0px 15px 0px gray",
              fontWeight: "bold",
              backgroundColor: task?.colour,
            },
          ]}
        >
          <View style={{ justifyContent: "center" }}>
            <Text
              style={[
                styles.title,
                {
                  color: "rgba(255, 255, 255,0.5)",
                  textShadow: "0px 0px 5px white",
                },
              ]}
            >
              {task?.title}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                alignSelf: "center",
                lineHeight: 30,
                color: "rgba(255, 255, 255,0.5)",
              }}
            >
              {task?.description}
            </Text>
          </View>
        </View>
        <Text style={{ width: "100%", borderWidth: 1 }}></Text>
        <View style={styles.container}>
          <Text style={styles.containerTitle}></Text>
          <View style={styles.streakStat}>
            <Text style={styles.title}>Streak</Text>
            {streak?.map((item, index) => {
              return (
                <StreakBox colour={task?.colour} streak={item} key={index} />
              );
            })}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Task Info</Text>
          <TaskInfoTable
            targetType={task?.targetType}
            isMeasurable={task?.isMeasurable}
            data={task?.taskReport}
            target={task?.target}
            colour={task?.colour}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Report</Text>
          <TaskHistorGraph
            targetType={task?.targetType}
            target={task?.target}
            isMeasurable={task?.isMeasurable}
            colour={task?.colour}
            data={task?.taskReport}
            onPress={handleXView}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.containerTitle}>Calender</Text>
          <View style={styles.calender}>
            <ContributionGraph
              values={contributionData}
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
    color: "rgb(154, 0, 90)",
    display: "flex",
    minWidth: "100%",
    maxHeight: "20%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
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
