import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import TodaysTask from "@/components/todaysTask";
import Modal from "@/components/modal";
import Animated, { FadeIn } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

class Dashboard extends Component {
  state = {
    tasks: [
      {
        _id: "0",
        title: "study",
        priority: 1,
        score: 5,
        target: 10,
        remarks: "ha hah ahahaha asfasf",
        isMeasurable: true,
        isDone: false,
        subTasks: [
          {
            _id: "0",
            title: "study",
            priority: 1,
            score: 5,
            target: 10,
            remarks: "ha hah ahahaha asfasf",
            isMeasurable: true,
            isDone: false,
            subTasks: [],
          },
          {
            _id: "0",
            title: "study",
            priority: 1,
            score: 5,
            target: 10,
            remarks: "ha hah ahahaha asfasf",
            isMeasurable: true,
            isDone: false,
            subTasks: [],
          },
        ],
      },
      {
        _id: "1",
        title: "game",
        priority: 1,
        score: 8,
        target: 8,
        remarks: "ha hah ahahaha asfasf",
        isMeasurable: true,
        isDone: false,
        subTasks: [],
      },
      {
        _id: "2",
        title: "exercise",
        priority: 1,
        isMeasurable: false,
        score: 0,
        target: 1,
        remarks: "",
        isDone: true,
        subTasks: [],
      },
      {
        _id: "3",
        title: "meditate",
        priority: 1,
        isMeasurable: false,
        score: 0,
        target: 1,
        isDone: false,
        subTasks: [],
      },
      {
        _id: "4",
        title: "10k steps",
        priority: 1,
        isMeasurable: false,
        score: 0,
        target: 1,
        isDone: false,
        subTasks: [],
      },
    ],
    isModalVisible: false,
    currentTask: {},
    completionValue: 30,
    completionTarget: 50,
    showCompletion: false,
  };

  showTaskEditModal = (index: number) => {
    console.log("show modal", index);
    this.setState({ currentTask: this.state.tasks[index] });
    this.setState({ isModalVisible: true });
  };

  hideTaskEditModal = () => {
    console.log("hide modal");
    this.setState({ currentTask: {} });
    this.setState({ isModalVisible: false });
  };

  updateTaskScore = (value: string, index: number) => {
    let newTasks = this.state.tasks;
    const oldScore = newTasks[index].score;
    let newCompletionValue = this.state.completionValue;

    newTasks[index].score = parseInt(value);
    newCompletionValue +=
      ((10 / newTasks[index].priority) * (newTasks[index].score - oldScore)) /
      newTasks[index].target;

    if (newCompletionValue / this.state.completionTarget === 1)
      console.log("sd");
    this.setState({ completionValue: newCompletionValue });
    this.setState({ tasks: newTasks });
  };

  toggleTaskCheck = (index: number) => {
    let newTasks = this.state.tasks;
    newTasks[index].isDone = !newTasks[index].isDone;
    let newCompletionValue = this.state.completionValue;

    if (newTasks[index].isDone)
      newCompletionValue += 10 / newTasks[index].priority;
    else newCompletionValue -= 10 / newTasks[index].priority;

    if (newCompletionValue / this.state.completionTarget === 1)
      console.log("sd");
    this.setState({ completionValue: newCompletionValue });
    this.setState({ tasks: newTasks });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.contentBox}>
            <Text style={styles.contentHead}>Your day includes...</Text>
            <View style={{ flexDirection: "column" }}>
              {this.state.tasks.map((task: any, index: number) => {
                return (
                  <TodaysTask
                    key={index}
                    index={index}
                    task={task}
                    showModal={this.showTaskEditModal}
                    toggleCheck={this.toggleTaskCheck}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.contentHead}>Report</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {[80, 100, 70, 40, 50, 100, 20].map((score, index) => {
                if (score == 100) {
                  return (
                    <AntDesign key={index} name="checkcircle" size={28} color="green" />
                  );
                } else
                  return (
                    <Progress.Circle
                      animated={false}
                      key={index}
                      style={{ cursor: "pointer" }}
                      progress={score / 100}
                      color={"red"}
                      thickness={4}
                      textStyle={{ fontSize: 9 }}
                      showsText={true}
                      size={33}
                    />
                  );
              })}
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.contentHead}>You can do it...</Text>
          </View>
          {this.state.completionValue / this.state.completionTarget === 2 ? (
            <Animated.View
              entering={FadeIn}
              style={styles.celebModal}
            ></Animated.View>
          ) : (
            <></>
          )}
          {this.state.isModalVisible ? (
            <Modal
              task={this.state.currentTask}
              hideModal={this.hideTaskEditModal}
              updateScore={this.updateTaskScore}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    padding: 10,
  },
  contentBox: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 20,
    opacity: 0.7,
    marginBottom: 10,
  },
  contentHead: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  modal: {
    width: "100%",
    backgroundColor: "crimson",
  },
  modalHead: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "whitesmoke",
    borderWidth: 2,
    borderColor: "gray",
    fontWeight: "bold",
    boxShadow: "0 3px 3px black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    fontSize: 30,
  },
  modalContent: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "wheat",
    padding: 20,
    borderRadius: 40,
  },
  modalRows: {
    alignSelf: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    gap: 20,
  },
  textField: {
    color: "gray",
    width: "30%",
    textAlign: "center",
    borderRadius: 2,
    boxShadow: "inset 0 0 5px gray",
    fontSize: 15,
  },
  celebModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",
    backgroundImage:
      "url('https://cdn.pixabay.com/animation/2024/05/02/07/43/07-43-00-535_512.gif')",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
