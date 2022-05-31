import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Button,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../../App";

// Default Form Values
const defaultForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const RegistrationForm = (props) => {
  // State and Variable Declaration
  const { setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);
  const [formData, setFormData] = useState(defaultForm);
  const { first_name, last_name, email, password, password_confirmation } =
    formData;
  const navigation = useNavigation();

  // Reset formData to default values
  const clearPasswords = () =>
    setFormData((formData) => {
      return { ...formData, password: "", password_confirmation: "" };
    });

  const onSubmitPress = () => {
    console.log("submit pressed");
    fetch(URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formData,
        is_bot: false,
        phone: "",
        username: `${first_name}${last_name[0]}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => setUser(data));
        } else {
          res.json().then((data) => {
            clearPasswords();
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        clearPasswords();
        console.log(error.message);
      });
  };

  const handleFormChange = (text, name) => {
    const newValue = text;
    const updatedFormData = { ...formData, [name]: newValue };

    setFormData(updatedFormData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoComplete={"name-given"}
        textContentType={"givenName"}
        autoCorrect={false}
        style={styles.input}
        placeholder={"first name"}
        value={first_name}
        onChangeText={(text) => handleFormChange(text, "first_name")}
      />
      <TextInput
        autoComplete={"name-family"}
        textContentType={"familyName"}
        autoCorrect={false}
        style={styles.input}
        placeholder={"last name"}
        value={last_name}
        onChangeText={(text) => handleFormChange(text, "last_name")}
      />
      <TextInput
        autoComplete={"email"}
        textContentType={"emailAddress"}
        autoCorrect={false}
        keyboardType={"email-address"}
        style={styles.input}
        placeholder={"email"}
        value={email}
        onChangeText={(text) => handleFormChange(text, "email")}
      />
      <TextInput
        autoComplete={"password-new"}
        textContentType={"newPassword"}
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={true}
        placeholder={"password"}
        value={password}
        onChangeText={(text) => handleFormChange(text, "password")}
      />
      <TextInput
        autoComplete={"password"}
        textContentType={"password"}
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={true}
        placeholder={"confirm password"}
        value={password_confirmation}
        onChangeText={(text) => handleFormChange(text, "password_confirmation")}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={"Submit"}
          onPress={onSubmitPress}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={"Return to Login"}
          onPress={() => navigation.goBack()}
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
    margin: 10,
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

export default RegistrationForm;
