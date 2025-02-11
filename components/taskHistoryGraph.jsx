import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { BarChart, yAxisSides } from "react-native-gifted-charts";

const taskHistoryGraph = ({
  targetType,
  isMeasurable,
  target,
  data,
  onPress,
  colour,
}) => {
  const screenDimension = Dimensions.get("window");

  const getColour = (workDone, isDone) => {
    if (!isMeasurable) {
      if (isDone) return colour;
      else return "rgb(200,200,200)";
    } else {
      if (targetType === "atleast" && target <= workDone) return colour;
      else if (targetType === "atmost" && target >= workDone) return colour;
      else if (targetType === "exactly" && target === workDone) return colour;
      else return "rgb(200,200,200)";
    }
  };

  var date = new Date("05/02/2025");
  date = new Date(date.setDate(date.getDate() + 1));
  var maxValue = Number.MIN_VALUE;

  let barData = data
    .map((obj) => {
      date = new Date(date.setDate(date.getDate() - 1));
      const val = isMeasurable ? obj.workDone : isDone ? 1 : 0;
      maxValue = maxValue < val ? val : maxValue;
      const formatedDate =
        date.getDate() == 1 ? date.getDate() + " fev" : date.getDate();
      return {
        value: val,
        label: formatedDate,
        frontColor: getColour(obj.workDone, obj.isDone),
        topLabelComponent: () => (
          <Text style={{ color: colour, fontSize: 12, marginBottom: 6 }}>
            {isMeasurable ? obj.workDone : isDone}
          </Text>
        ),
      };
    })
    .reverse();

  barData = barData.concat(barData);
  barData = barData.concat(barData);

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
                width: screenDimension.width / 5,
                backgroundColor: colour,
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
      <View style={[styles.chart, { width: 0.95 * screenDimension.width }]}>
        <BarChart
          yAxisSide={yAxisSides.RIGHT}
          maxValue={1.25 * maxValue}
          barWidth={10}
          height={100}
          spacing={10}
          yAxisThickness={0}
          noOfSections={3}
          data={barData}
          showReferenceLine1
          referenceLine1Position={target}
          referenceLine1Config={{
            color: "gray",
            dashWidth: 5,
            dashGap: 2,
          }}
          showLine
          lineConfig={{
            curved: true,
            color: "crimson",
            dataPointsColor: "crimson",
          }}
          isAnimated
        />
        {/* <BarChart
          data={data}
          width={0.95 * screenWidth}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          showBarTops={false}
          fromZero={true}
        /> */}
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
    overflowX: "scroll",
    justifyContent: "flex-start",
    alignSelf: "center",
    direction: "rlt",
  },
});
