import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TaskDetails = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    repetitionType: "daily",
    date: new Date(),
    isMeasurable: 0,
    unit: "",
    target: "",
  });

  const [isMeasurable, setIsMeasurable] = useState(true);

	const router = useRouter();
  const submitForm = () => {
    console.log(formData);
    alert("submit form");
    router.navigate("/dashboard");
  };
  return (
    <View style={styles.slide2}>
      <Text style={styles.heading}>Elaborate your habit </Text>
      <TextInput
        placeholder="title"
        style={styles.textField}
        onChangeText={(value) =>
          setFormData((prevFormData) => ({ ...prevFormData, title: value }))
        }
      />
      <TextInput
        placeholder="description (optional)"
        style={styles.textField}
        //onChangeText={(value)=>setFormData((prevFormData) => ({ ...prevFormData, description: value }))}
      />
      <Picker
        style={styles.picker}
        selectedValue={formData.isMeasurable}
        onValueChange={(value) => {
          const val = value == 1 ? true : false;
          setIsMeasurable(val);
          return setFormData((prevFormData) => ({
            ...prevFormData,
            isMeasurable: value,
          }));
        }}
      >
        <Picker.Item label="Track progress by.." value={0} />
        <Picker.Item label="measurable" value={1} />
        <Picker.Item label="yes or no" value={2} />
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue="daily"
        onValueChange={(value) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            repetitionType: value,
          }))
        }
      >
        <Picker.Item value="daily" label="Daily" />
        <Picker.Item value="weekly" label={"Weekly (on every Tuesday)"} />
        <Picker.Item value="monthly" label="Monthly (on 2nd)" />
      </Picker>
			<View>
			<label for="date">Start date</label>
			<input type="date" id="date" aria-describedby="date-format" min="2021-03-01" max="2031-01-01" />
			</View>
      {isMeasurable ? (
        <>
          <TextInput
            placeholder="unit e.g. hours"
            style={styles.textField}
            onChangeText={(value) =>
              setFormData((prevFormData) => ({ ...prevFormData, unit: value }))
            }
          />
          <TextInput
            placeholder="target e.g. 8"
            style={styles.textField}
            onChangeText={(value) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                target: value,
              }))
            }
          />
        </>
      ) : (
        <></>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.submitButton}
        onPress={submitForm}
      >
        <MaterialIcons
          style={{ display: "flex", justifyContent: "center" }}
          name="add"
          size={20}
          color="black"
        />
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
	slide2:{
		display:'flex',
		flexDirection:'column',
		gap:20
	},
  heading: {
    color: "white",
    paddingVertical:5,
    backgroundColor:'blue',
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "unicase",
    borderTopLeftRadius: 40,
  },
  picker: {
    backgroundColor:'lightgray',
    padding:10,
    boxShadow: "0 0 2px gray",
    color:'gray'
  },
  textField: {
    backgroundColor:'lightgray',
    color: "gray",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 2,
    boxShadow: "inset 0 0 5px gray",
  },
  submitButton: {
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "black",
    boxShadow: "0 2px 2px gray",
    backgroundColor: "whitesmoke",
    margin: 10,
  },
  text: {
    display: "flex",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
