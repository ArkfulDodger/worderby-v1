import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import SubmitWordButton from "./menu/SubmitWordButton";
import ContinueButton from "./menu/ContinueButton";
import NewGameButton from "./menu/NewGameButton";

const GameMenu = ({
  game,
  user,
  isPlayerTurn,
  onWordSubmit,
  onContinueGame,
  onNewGame,
}) => {
  return (
    <SafeAreaView style={styles.menuArea}>
      <View style={styles.menu}>
        <View style={{ width: 100 }}>
          {game.is_over ? (
            <NewGameButton onNewGame={onNewGame} />
          ) : isPlayerTurn ? (
            <SubmitWordButton game={game} onWordSubmit={onWordSubmit} />
          ) : (
            <ContinueButton onContinueGame={onContinueGame} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuArea: {
    backgroundColor: "#FFD1A6",
  },
  menu: {
    backgroundColor: "#FFD1A6",
    borderTopWidth: 1,
    borderTopColor: "#606060",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameMenu;
