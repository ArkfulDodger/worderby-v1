import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Platform, Button } from "react-native";

const LoginForm = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoComplete={"username"}
        textContentType={"username"}
        autoCorrect={false}
        style={styles.input}
        placeholder={"email/username"}
      />
      <TextInput
        autoComplete={"password"}
        textContentType={"password"}
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={true}
        placeholder={"password"}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={"Log In"}
          onPress={() => console.log("log in pressed")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={"Create New Account"}
          onPress={() => console.log("Create New Pressed")}
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
    // backgroundColor: "red",
  },
  input: {
    backgroundColor: "#FFFFFFB3",
    padding: 10,
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

export default LoginForm;
