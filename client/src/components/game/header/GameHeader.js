import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import HeaderPlayerInfo from "./HeaderPlayerInfo";
import CounterContainer from "./CounterContainer";
import TurnIndicators from "./TurnIndicators";

const GameHeader = ({ game, user, timer }) => {
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
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <HeaderPlayerInfo
              isPlayer={true}
              name={player.username}
              score={playerScore}
              timer={timer}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <TurnIndicators
              game={game}
              isPlayer={true}
              playerTurn={game.player1.id === user.id ? 1 : 2}
            />
            <CounterContainer timer={timer} />
            <TurnIndicators
              game={game}
              isPlayer={false}
              playerTurn={game.player1.id === user.id ? 2 : 1}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <HeaderPlayerInfo
              isPlayer={false}
              name={opponent.username}
              score={opponentScore}
            />
          </View>
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
