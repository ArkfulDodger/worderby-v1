import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Button,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

const RegistrationForm = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoComplete={"name-given"}
        textContentType={"givenName"}
        autoCorrect={false}
        style={styles.input}
        placeholder={"first name"}
      />
      <TextInput
        autoComplete={"name-family"}
        textContentType={"familyName"}
        autoCorrect={false}
        style={styles.input}
        placeholder={"last name"}
      />
      <TextInput
        autoComplete={"email"}
        textContentType={"emailAddress"}
        autoCorrect={false}
        keyboardType={"email-address"}
        style={styles.input}
        placeholder={"email"}
      />
      <TextInput
        autoComplete={"password-new"}
        textContentType={"newPassword"}
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={true}
        placeholder={"password"}
      />
      <TextInput
        autoComplete={"password"}
        textContentType={"password"}
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={true}
        placeholder={"confirm password"}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={"Submit"}
          onPress={() => console.log("Submit pressed")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={"Return to Login"}
          onPress={() => console.log("Return to Login Pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    // backgroundColor: "red",
  },
  input: {
    backgroundColor: "#FFFFFFB3",
    padding: 5,
    margin: 5,
    width: 250,
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  buttonContainer: {
    width: 200,
    margin: 5,
  },
});

export default RegistrationForm;
