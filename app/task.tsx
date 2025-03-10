import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useContext,useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ValidateTextInput from "@/components/validateTextInput";
import { UserContext } from "@/app/context/userContext";
import { Task } from "@/interfaces/interfaces";

const TaskDetails = () => {
  const { id,job } = useLocalSearchParams();
  let user, task: Task | undefined,updateTaskField, updateTaskReportField;
  
  if(job=='edit' && typeof id==='string') {
    const context = useContext(UserContext);
    if (!context) return <Text>Error: UserContext is undefined</Text>;
    user=context.user
    task = user?.allTasks[parseInt(id)]
    updateTaskField=context.updateTaskField
    updateTaskReportField=context.updateTaskReportField
  }
  
  const [formData, setFormData] = useState({
    title: task?task.title:"",
    description: task?task.description:"",
    priority: task?task.priority:"high",
    repetition: task?task.repetition:{ type: "daily", value: "1" },
    isMeasurable: task?.isMeasurable?1:2, // 1 for measurable, 2 for yes|no
    targetType:task?task.targetType: "", //atleast|atmost|exactly|any
    unit: task?task.unit:"",
    target: task?task.target:"",
  });

  const router = useRouter();

  const submitForm = async () => {
    //if(formData.isMeasurable==1)
    console.log(formData);
    const requestOptions = {
      method: job=="create"?"POST":"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        isMeasurable: formData.isMeasurable == 1 ? true : false,
      }),
    };
    console.log("form data is " + requestOptions.body);
    try {
      await fetch("http://localhost:3000/api/v1/task", requestOptions).then(
        (response) => {
          response
            .json()
            .then((data) => alert(data.message))
            .catch((error) => {
              console.log(error);
              alert(`failed to ${job} task`);
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
    setFormData(() => ({
      title: "",
      description: "",
      priority: "high",
      repetition: { type: "daily", value: "1" },
      isMeasurable: 0,
      unit: "",
      targetType: "",
      target: "",
    }));
    router.navigate("/dashboard");
  };
  return (
    <View
      style={[
        styles.createTask,
        { height: 0.8 * Dimensions.get("screen").height },
      ]}
    >
      <Text style={styles.heading}>{job} your habit </Text>
      <View style={{ minHeight: 0.6 * Dimensions.get("screen").height }}>
        <ValidateTextInput
          name="title"
          placeholder="task name"
          defaultValue={task?.title}
          handleChange={(value: string) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              title: value,
            }));
          }}
        />
        <View>
          <Text style={{ color: "transparent" }}>|</Text>
          <TextInput
            placeholder="description (optional)"
            style={styles.textField}
            defaultValue={task?.description}
            onChangeText={(value: string) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                description: value,
              }))
            }
          />
        </View>
        <View>
          <Text style={{ color: "transparent" }}>|</Text>
          <Picker
            style={styles.picker}
            selectedValue={formData.isMeasurable}
            onValueChange={(value) => {
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
        </View>
        <View>
          <Text style={{ color: "transparent" }}>|</Text>
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
            <Picker.Item value="once" label="One time activity" />
          </Picker>
        </View>
        {formData.isMeasurable == 1 ? (
          <>
            <Text style={{ color: "transparent" }}>|</Text>
            <View style={styles.measurableContainer}>
              <View>
                <Text style={{ color: "transparent" }}>|</Text>
                <Picker
                  style={[
                    styles.picker,
                    { width: Dimensions.get("window").width / 4 },
                  ]}
                  selectedValue={formData.targetType}
                  onValueChange={(value) => {
                    return setFormData((prevFormData) => ({
                      ...prevFormData,
                      targetType: value,
                    }));
                  }}
                >
                  <Picker.Item label="at least" value="atleast" />
                  <Picker.Item label="at most" value="atmost" />
                  <Picker.Item label="any" value="any" />
                  <Picker.Item label="exactly" value="exactly" />
                </Picker>
              </View>
              <View style={{ width: Dimensions.get("window").width / 4 }}>
                <ValidateTextInput
                  name="unit"
                  placeholder="unit e.g. hours"
                  defaultValue={task?.unit}
                  handleChange={(value: string) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      unit: value,
                    }));
                  }}
                />
              </View>
              <View style={{ width: Dimensions.get("window").width / 4 }}>
                <ValidateTextInput
                  name="target"
                  placeholder="target e.g. 8"
                  defaultValue={task?.target}
                  handleChange={(value: string) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      target: value,
                    }));
                  }}
                />
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.submitButton,
            { width: Dimensions.get("window").width / 4 },
          ]}
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
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  createTask: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    justifyContent: "space-evenly",
    gap: 20,
  },
  heading: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
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
  measurableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  submitButton: {
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 3,
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
  footer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    width: "100%",
    borderBottomRightRadius: 40,
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
