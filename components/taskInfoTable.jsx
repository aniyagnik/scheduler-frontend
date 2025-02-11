import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const TaskInfoTable = ({ targetType, isMeasurable, data, target, colour }) => {
  var date = new Date();
  const shade = colour?.slice(4, colour.length - 1);

  const getRowColour = (index, isDone, workDone) => {
    const style = {
      backgroundColor: `rgba(${shade},0.3)`,
      marginBottom: 2,
      boxShadow: `inset 0px 0px 1px 2px rgb(${shade
        .split(",")
        .map((c) => 255 - parseInt(c))})`,
    };
    if (!isMeasurable) {
      if (isDone) return style;
      else
        return {
          ...style,
          backgroundColor: "rgb(200,200,200)",
          boxShadow: `inset 0px 0px 1px 1px rgb(0,0,0)`,
        };
    } else {
      if (targetType === "atleast" && target <= workDone) return style;
      else if (targetType === "atmost" && target >= workDone) return style;
      else if (targetType === "exactly" && target === workDone) return style;
      else
        return {
          ...style,
          backgroundColor: "rgb(200,200,200)",
          boxShadow: `0`,
        };
    }
  };
  const tableData = data.map((item) => {
    var yyyy = date.getFullYear() - 2000;
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = dd + "/" + mm + "/" + yyyy;
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
                className={"tableRow"}
                style={[
                  styles.row,
                  getRowColour(index, row.isDone, row.workDone),
                ]}
                key={index}
              >
                <Text style={[styles.col, { minWidth: "20%" }]}>
                  {row.date}
                </Text>
                <Text style={[styles.col, { minWidth: "20%" }]}>
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
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "stretch",
  },
});
