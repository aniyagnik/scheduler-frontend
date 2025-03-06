import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import Entypo from "@expo/vector-icons/Entypo";

export default function Modal({ task, index,hideModal, updateTask }) {
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      onClick={hideModal}
    >
      <Animated.View
        entering={SlideInDown}
        style={{
          width: "30vh",
          height: "30vh",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        pointerEvents="auto"
        onClick={(event) => event.stopPropagation()} // Stops click event from reaching the outer view
      >
        <View style={styles.modalHead}>
          <Text style={{ fontSize: 20, fontWeight: "bold",color:task.colour }}>{task.title}</Text>
        </View>
        <View style={styles.modalContent}>
        {task?task.isMeasurable ? (
            <>
              <View style={styles.modalRows}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Target</Text>
                <TextInput
                  placeholder={task.target}
                  style={styles.textField}
                  editable={false}
                />
              </View>
              <View style={styles.modalRows}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Today</Text>
                <TextInput
                  defaultValue={task.taskReport[0].workDone}
                  style={styles.textField}
                  onChangeText={(value) => updateTask("workDone", value, index)}
                />
              </View>
            </>
          ) : (
            <TouchableOpacity onPress={() => updateTask("isDone",!task.taskReport[0].isDone,index)}>
              <View style={{ cursor: "pointer" }}>
                {task.taskReport[0].isDone ? (
                  <Entypo name="check" size={24} color="green" />
                ) : (
                  <Entypo name="cross" size={24} color="gray" />
                )}
              </View>
            </TouchableOpacity>
          ):(
            <AntDesign name="loading1" size={24} color="black" />
          )}
          <View style={styles.modalRows}>
            <TextInput
              placeholder="remarks"
              defaultValue={task.taskReport[0].remark}
              style={styles.textarea}
              multiline={true}
              onChangeText={(value) => updateTask("remark", value, index)}
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modalHead: {
    width: "100%",
    height: "20%",
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
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "80%",
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
  textarea: {
    color: "black",
    width: "95%",
    height: "100%",
    textAlign: "center",
    borderRadius: 2,
    boxShadow: "inset 0 0 5px gray",
    fontSize: 15,
  },
});
