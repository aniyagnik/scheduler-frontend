import { StyleSheet, Text, View, TextInput } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

export default function Modal({ task, hideModal, updateScore,updateRemarks }) {
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
      >
        <View style={styles.modalHead}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{task.title}</Text>
        </View>
        <View style={styles.modalContent}>
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
              value={task.score}
              style={styles.textField}
              onChangeText={(value) => updateScore(value, index)}
            />
          </View>
          <View style={styles.modalRows}>
            <textarea
              placeholder="remarks"
              value={task.remarks}
              style={styles.textarea}
              onChangeText={(value) => updateRemarks(value, index)}
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
    width: "90%",
    height: "100%",
    textAlign: "center",
    borderRadius: 2,
    boxShadow: "inset 0 0 5px gray",
    fontSize: 15,
  },
});
