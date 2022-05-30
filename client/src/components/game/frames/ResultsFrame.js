import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WinnerMessage from "../WinnerMessage";
import AlertMessage from "../AlertMessage";

const ResultsFrame = ({ game, user, alertMessage }) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <AlertMessage alertMessage={alertMessage} />
      </View>
      <View style={styles.container}>
        <WinnerMessage game={game} user={user} />
      </View>
      <View style={{ flex: 1 }}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResultsFrame;
