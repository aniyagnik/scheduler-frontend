import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

const ValidateTextInput = ({ name, placeholder, handleChange }) => {
  const validate = (name, value) => {
    if (value == null || value == "") setError(`*invalid ${name}`);
    else setError("");
  };
  const [error, setError] = useState("");
  return (
    <View>
      <Text style={styles.validateText}><Text style={{color:'transparent'}}>|</Text>{error}</Text>
      <TextInput
        onChangeText={(value) => {
          validate(name, value);
          handleChange(value);
        }}
        placeholder={placeholder}
        style={styles.textField}
      />
    </View>
  );
};

export default ValidateTextInput;

const styles = StyleSheet.create({
  validateText: {
    color: "red",
  },
  textField: {
    color: "gray",
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
