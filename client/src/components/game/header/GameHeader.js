import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import HeaderPlayerInfo from "./HeaderPlayerInfo";

const GameHeader = ({ game, user }) => {
  const {
    player1,
    player2,
    player1_score: player1Score,
    player2_score: player2Score,
  } = game;

  const player = player1.id === user.id ? player1 : player2;
  const opponent = player1.id === user.id ? player2 : player1;
  const playerScore = player1.id === user.id ? player1Score : player2Score;
  const opponentScore = player1.id === user.id ? player2Score : player1Score;

  return (
    <LinearGradient colors={["#FFF6F0", "#FFD9BE"]}>
      <SafeAreaView>
        <View style={styles.header}>
          <HeaderPlayerInfo
            isPlayer={true}
            name={player.username}
            score={playerScore}
          />
          <HeaderPlayerInfo
            isPlayer={false}
            name={opponent.username}
            score={opponentScore}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  header: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#606060",
    borderBottomWidth: 1,
  },
};

export default GameHeader;
