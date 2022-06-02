import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ApMediumText from "../tools/ApMediumText";

const WinnerMessage = ({ game, user }) => {
  const isTie = game.player1_score === game.player2_score;
  const winner =
    game.player1_score > game.player2_score ? game.player1 : game.player2;
  const isPlayerWinner = winner.id === user.id;

  return (
    <View style={styles.container}>
      {isTie ? (
        <ApMediumText style={{ fontSize: 43 }}>Tied Game!</ApMediumText>
      ) : (
        <>
          <ApMediumText
            style={{
              fontSize: 43,
              color: isPlayerWinner ? "#DB00FF" : "#CA7900",
            }}
          >
            {isPlayerWinner ? "You win!" : winner.username}
          </ApMediumText>
          {!isPlayerWinner && (
            <ApMediumText style={{ fontSize: 43 }}>
              {isPlayerWinner ? "" : "wins!"}
            </ApMediumText>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor: "red",
  },
});

export default WinnerMessage;
