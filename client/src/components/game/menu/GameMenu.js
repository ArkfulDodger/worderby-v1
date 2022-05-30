import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import SubmitWordButton from "./SubmitWordButton";
import ContinueButton from "./ContinueButton";
import NewGameButton from "./NewGameButton";

const GameMenu = ({
  game,
  user,
  isPlayerTurn,
  isReadyToContinue,
  onWordSubmit,
  onContinueGame,
  onNewGame,
  rematchOffered,
  rematchGame,
  onAcceptRematch,
}) => {
  return (
    <SafeAreaView style={styles.menuArea}>
      <View style={styles.menu}>
        <View style={{ width: 100 }}>
          {game.is_over ? (
            <NewGameButton
              onNewGame={onNewGame}
              rematchOffered={rematchOffered}
              rematchGame={rematchGame}
              onAcceptRematch={onAcceptRematch}
            />
          ) : isPlayerTurn && !isReadyToContinue ? (
            <SubmitWordButton game={game} onWordSubmit={onWordSubmit} />
          ) : (
            <ContinueButton
              onContinueGame={onContinueGame}
              isPlayerTurn={isPlayerTurn}
              isReadyToContinue={isReadyToContinue}
            />
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
