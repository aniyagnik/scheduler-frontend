import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

const TaskInfoTable = () => {
  const tableData = Array(10).fill({
    date: "12/12/21",
    score: "2.6",
    isDone: false,
    remarks: "this is a note.",
  });
  return (
    <>
      <ScrollView>
        <View style={styles.table}>
          <View
            style={[styles.row, { backgroundColor: "crimson", borderWidth: 0 }]}
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
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "stretch",
  },
});
