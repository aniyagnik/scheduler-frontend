import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import TodaysTask from "@/components/todaysTask";
import Modal from "@/components/modal";
import Animated, { FadeIn } from "react-native-reanimated";

interface task {
  _id: String;
  title: String;
  priority: Number;
  taskReport: {
    date: Date;
    workDone: Number;
    remarks: String;
  };
  target: Number;
  isMeasurable: Boolean;
  isDone: Boolean;
}

interface myState {
  tasks: task[];
  isModalVisible: Boolean;
  currentTask: task | {};
  loading: Boolean;
  error: String;
}

class Dashboard extends Component<{}, myState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [],
      isModalVisible: false,
      currentTask: {},
      loading: true,
      error: "",
    };
  }

  toggleTaskEditModal = (index: number) => {
    if (Object.getOwnPropertyNames(this.state.currentTask).length == 0)
      this.setState({ currentTask: this.state.tasks[index] });
    else this.setState({ currentTask: {} });
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  updateTaskRemarks = (value: string, index: number) => {
    let newTasks = this.state.tasks;
    newTasks[index].taskReport.remarks = value;
    this.setState({ tasks: newTasks });
  };

  updateTaskScore = (value: string, index: number) => {
    let newTasks = this.state.tasks;
    newTasks[index].taskReport.workDone = parseInt(value);
    this.setState({ tasks: newTasks });
  };

  toggleTaskCheck = (index: number) => {
    let newTasks = this.state.tasks;
    newTasks[index].isDone = !newTasks[index].isDone;
    this.setState({ tasks: newTasks });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("http://localhost:3000/api/v1/user/67a2e79597e84d7681b085f5").then(
      (response) => {
        response
          .json()
          .then((response) => {
            console.log(response.data.allTasks);
            this.setState({ tasks: response.data.allTasks, loading: false });
          })
          .catch((error) => {
            console.log(error);
            this.setState({ error, loading: false });
            alert("failed to fetch user data");
          });
      }
    );
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
                    showModal={this.toggleTaskEditModal}
                    toggleCheck={this.toggleTaskCheck}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text style={styles.contentHead}>You can do it...</Text>
          </View>
          {this.state.isModalVisible ? (
            <Modal
              task={this.state.currentTask}
              hideModal={this.toggleTaskEditModal}
              updateScore={this.updateTaskScore}
              updateRemarks={this.updateTaskRemarks}
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
});
