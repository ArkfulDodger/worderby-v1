import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WinnerMessage from "../WinnerMessage";
import AlertMessage from "../AlertMessage";
import WordResults from "./WordResults";

const ResultsFrame = ({ game, user, alertMessage }) => {
  return (
    <>
      <View>
        <AlertMessage alertMessage={alertMessage} />
      </View>
      <View style={styles.container}>
        <WinnerMessage game={game} user={user} />
      </View>
      <View
        style={{
          borderWidth: 2,
          borderColor: "gray",
          margin: 5,
          flex: 0,
          borderRadius: 10,
          padding: 5,
          backgroundColor: "#FFFFFFAA",
        }}
      >
        <WordResults game={game} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResultsFrame;
