import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { getColour } from "@/utility/index";

const TaskInfoTable = ({ targetType, isMeasurable, data, target, colour }) => {
  var date = new Date();
  const tableData = data.map((item) => {
    const formattedToday = date.toLocaleDateString('en-GB')
    date = new Date(date.setDate(date.getDate() - 1)); //for daily
    return {
      ...item,
      date: formattedToday,
    };
  });

  return (
    <>
      <ScrollView>
        <View style={styles.table}>
          <View style={[styles.row, { backgroundColor: colour }]}>
            <Text
              style={[
                styles.col,
                { color: "white", minWidth: "25%", fontWeight: "bold" },
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
                className={"tableRow"}
                style={[
                  styles.row,
                  {
                    backgroundColor: `rgba(${getColour(
                      isMeasurable,
                      row.isDone,
                      row.workDone,
                      target,
                      targetType,
                      colour
                    ).slice(4, colour.length - 1)},0.3)`,
                  },
                ]}
                key={index}
              >
                <Text style={[styles.col, { minWidth: "25%" }]}>
                  {row.date}
                </Text>
                <Text style={[styles.col, { minWidth: "15%" }]}>
                  {row.workDone >= 0 ? (
                    row.workDone
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
                  {row.remark}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TaskInfoTable;

const styles = StyleSheet.create({
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
    marginBottom: 2,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "stretch",
  },
});
