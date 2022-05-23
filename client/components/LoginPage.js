import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Title from "./tools/Title";
import LoginForm from "./forms/LoginForm";

const LoginPage = (props) => {
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
  },
});

export default LoginPage;
