import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../../App";

// Default Form Values
const defaultForm = {
  username: "",
  password: "",
};

const LoginForm = (props) => {
  // State and Variable Declaration
  const { setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);
  const [formData, setFormData] = useState(defaultForm);
  const { username, password } = formData;
  const navigation = useNavigation();

  // Handles input onChange events: input name attributes must match formData keys
  const handleFormChange = (text, name) => {
    const newValue = text;
    const updatedFormData = { ...formData, [name]: newValue };

    setFormData(updatedFormData);
  };

  const onLoginPress = () => {
    console.log("log in pressed");

    fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => setUser(data));
        } else {
          res.json().then((data) => alert(data.error));
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoComplete={"username"}
        textContentType={"username"}
        autoCorrect={false}
        style={styles.input}
        placeholder={"email/username"}
        value={username}
        onChangeText={(text) => handleFormChange(text, "username")}
      />
      <TextInput
        autoComplete={"password"}
        textContentType={"password"}
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={true}
        placeholder={"password"}
        value={password}
        onChangeText={(text) => handleFormChange(text, "password")}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title={"Log In"} onPress={onLoginPress} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={"Create New Account"}
          onPress={() => navigation.navigate("Registration")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  input: {
    backgroundColor: "#FFFFFFB3",
    padding: 10,
    margin: 5,
    width: 350,
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  buttonContainer: {
    width: 200,
    margin: 5,
  },
});

export default LoginForm;
