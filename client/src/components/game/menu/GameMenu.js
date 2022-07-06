import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import SubmitWordButton from "./SubmitWordButton";
import ContinueButton from "./ContinueButton";
import NewGameButton from "./NewGameButton";
import PButton from "../../tools/PButton";
import { useNavigation } from "@react-navigation/native";

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
  muted,
  setMuted,
  backDisabled,
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.menuArea}>
      <View style={styles.menu}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            alignItems: "center",
            width: 120,
            opacity: backDisabled ? 0.4 : 1,
          }}
        >
          <PButton
            style={{
              width: 90,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
            onPress={
              !backDisabled
                ? () => navigation.goBack()
                : () => console.log("no backsies")
            }
          >
            Home
          </PButton>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            alignItems: "center",
            width: 120,
            opacity:
              game.is_over ||
              (isPlayerTurn && !isReadyToContinue) ||
              (!isPlayerTurn && isReadyToContinue)
                ? 1
                : 0.4,
          }}
        >
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
        <View style={styles.buttonContainer}>
          <PButton
            style={{
              width: 90,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
            onPress={() => setMuted((m) => !m)}
          >
            {muted ? "Unmute" : "Mute"}
          </PButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuArea: {
    backgroundColor: "#FFD1A6",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    width: 120,
  },
  menu: {
    backgroundColor: "#FFD1A6",
    borderTopWidth: 1,
    borderTopColor: "#606060",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  inactive: {
    opacity: 0.4,
  },
});

export default GameMenu;
