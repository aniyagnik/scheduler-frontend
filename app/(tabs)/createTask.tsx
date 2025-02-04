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
import ValidateTextInput from "@/components/validateTextInput";

const TaskDetails = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "high",
    repetition: { type: "daily", value: "1" },
    startFrom: new Date(),
    isMeasurable: 0,
    unit: "",
    target: "",
  });

  const router = useRouter();

  const submitForm = async () => {
    console.log(formData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData }),
    };
    try {
      await fetch("http://localhost:3000/api/v1/task", requestOptions).then(
        (response) => {
          response.json().then((data) => {
            alert(data.message);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
    router.navigate("/dashboard");
  };
  return (
    <View style={styles.createTask}>
      <Text style={styles.heading}>Elaborate your habit </Text>
      <ValidateTextInput
        name="title"
        placeholder="task name"
        handleChange={(value: string) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            title: value,
          }));
        }}
      />
      <TextInput
        placeholder="description (optional)"
        style={styles.textField}
        onChangeText={(value: string) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            description: value,
          }))
        }
      />
      <Picker
        style={styles.picker}
        selectedValue={formData.isMeasurable}
        onValueChange={(value) => {
          const val = value == 1 ? true : false;
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
            repetition: { ...prevFormData.repetition, type: value },
          }))
        }
      >
        <Picker.Item value="daily" label="Daily" />
        <Picker.Item value="weekly" label={"Weekly (on every Tuesday)"} />
        <Picker.Item value="monthly" label="Monthly (on 2nd)" />
      </Picker>
      <View>
        <label htmlFor="date">Start date</label>
        <input
          style={styles.dateInput}
          type="date"
          id="date"
          aria-describedby="date-format"
          min={new Date().toLocaleDateString()}
          max="2031-01-01"
        />
      </View>
      {formData.isMeasurable == 1 ? (
        <>
          <ValidateTextInput
            name="unit"
            placeholder="unit e.g. hours"
            handleChange={(value: string) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                unit: value,
              }));
            }}
          />
          <ValidateTextInput
            name="target"
            placeholder="target e.g. 8"
            handleChange={(value: string) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                target: value,
              }));
            }}
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
  createTask: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-around",
    gap: 20,
  },
  heading: {
    color: "white",
    paddingVertical: 5,
    backgroundColor: "blue",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "unicase",
    borderTopLeftRadius: 40,
  },
  picker: {
    borderBottomWidth: 1,
    padding: 10,
    boxShadow: "0 0 3px gray",
    color: "gray",
  },
  textField: {
    color: "gray",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 2,
    borderBottomWidth: 1,
  },
  submitButton: {
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 5,
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
  dateInput: {
    marginTop: 5,
    padding: 10,
    boxShadow: "0 2px 2px gray",
    backgroundColor: "transparent",
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
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
