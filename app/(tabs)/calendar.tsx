import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import React from "react";

export default function CalendarScreen() {
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "whitesmoke",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const changeGraphData = (date: any) => {
    console.log("show calender ", date);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "45%" }}>
        <Calendar
          current={'2017-12-01'}
          markingType="multi-period"
          markedDates={{
            "2017-12-14": {
              periods: [
                { startingDay: false, endingDay: true, color: "#5f9ea0" },
                { startingDay: false, endingDay: true, color: "#ffa500" },
                { startingDay: true, endingDay: false, color: "#f0e68c" },
              ],
            },
            "2017-12-15": {
              periods: [
                { startingDay: true, endingDay: false, color: "#ffa500" },
                { color: "transparent" },
                { startingDay: false, endingDay: false, color: "#f0e68c" },
              ],
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    display: "flex",
    color: "gold",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
  },
});
