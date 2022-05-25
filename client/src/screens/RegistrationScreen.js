import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from "react-native";
import Title from "../components/Title";
import RegistrationForm from "../components/forms/RegistrationForm";
import GText from "../components/tools/GText";

const RegistrationScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
      style={styles.keyboardContainer}
    >
      <ScrollView
        style={{ flex: 1 }}
        centerContent={true}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
          <Title />
          <View>
            <GText>Create Account</GText>
          </View>
          <RegistrationForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegistrationScreen;
