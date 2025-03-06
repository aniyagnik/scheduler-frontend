import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import TodaysTask from "@/components/todaysTask";
import Modal from "@/components/modal";
import { UserContext } from "@/app/context/userContext";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

interface myState {
  isModalVisible: Boolean;
  currentTaskIndex: number;
  error: String;
}

class Dashboard extends Component<{}, myState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isModalVisible: false,
      currentTaskIndex: -1,
      error: "",
    };
  }

  toggleTaskEditModal = (index: number) => {
    if (this.state.currentTaskIndex === -1)
      this.setState({ currentTaskIndex: index });
    else this.setState({ currentTaskIndex: -1 });
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <UserContext.Consumer>
        {(context) => {
          if (!context) return <Text>Error: UserContext is undefined</Text>;
          const { user, updateTaskField, updateTaskReportField } = context;
          return (
            <ScrollView>
              <Stack.Screen
                options={{
                  headerRight:()=>  
                  <Link href='/calendar'>
                    <Ionicons
                    style={{right:20}}
                    name="calendar-sharp"
                    color='black'
                    size={24}
                  />
                </Link>
                }}
              />
              <View style={styles.container}>
                <View style={styles.contentBox}>
                  <Text style={styles.contentHead}>Your day includes...</Text>
                  <View style={{ flexDirection: "column" }}>
                    {user ? (
                      user.allTasks.map((task: any, index: number) => {
                        return (
                          <TodaysTask
                            key={index}
                            index={index}
                            task={task}
                            showModal={this.toggleTaskEditModal}
                          />
                        );
                      })
                    ) : (
                      <TodaysTask
                        index={-1}
                        task={null}
                        showModal={this.toggleTaskEditModal}
                      />
                    )}
                  </View>
                </View>
                <View style={styles.contentBox}>
                  <Text style={styles.contentHead}>You can do it...</Text>
                </View>
                {this.state.isModalVisible ? (
                  <Modal
                    task={user?.allTasks[this.state.currentTaskIndex]}
                    index={this.state.currentTaskIndex}
                    hideModal={this.toggleTaskEditModal}
                    updateTask={updateTaskReportField}
                  />
                ) : (
                  <></>
                )}
                  <View style={[styles.taskIcon,{position:'absolute',left:0.8*Dimensions.get('screen').width,top:0.8*Dimensions.get('screen').height}]}>
                    <Link href='/createTask'>
                    <Ionicons name={"add-circle"} color={"white"} size={24} />
                    </Link>
                  </View>
              </View>
            </ScrollView>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    padding: 5,
  },
  contentBox: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 20,
    opacity: 0.7,
    marginBottom: 5,
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
  taskIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    backgroundColor: "crimson",
    borderRadius: 10,
    boxShadow:"0px 0px 8px black",
  },
});
