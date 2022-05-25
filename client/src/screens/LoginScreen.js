import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Title from "../components/Title";
import LoginForm from "../components/forms/LoginForm";

const LoginScreen = (props) => {
  return (
    <View style={styles.centered}>
      <Title />
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default LoginScreen;
