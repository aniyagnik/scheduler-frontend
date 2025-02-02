import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const taskHistoryGraph = ({ chartConfig, data, onPress }) => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        {["Week", "Month", "Year"].map((item) => (
          <TouchableOpacity onPress={() => onPress(item)} key={item}>
            <View
              style={{
                marginBottom: 10,
                paddingVertical: 5,
                width: screenWidth / 5,
                backgroundColor: "crimson",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: 20,
                boxShadow: "2px 0px 5px 0px gray",
              }}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.chart}>
        <BarChart
          data={data}
          width={0.95 * screenWidth}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          showBarTops={false}
          fromZero={true}
        />
      </View>
    </>
  );
};

export default taskHistoryGraph;

const styles = StyleSheet.create({
  buttonText: {
    display: "flex",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
  },
  chart: {
    maxWidth: "100%",
    overflowX: "scroll",
  },
});
