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
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <PButton
            style={{
              // width: 120,
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
        <View style={{ flex: 1, width: 100, marginHorizontal: 10 }}>
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
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <PButton
            style={{
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
  menu: {
    backgroundColor: "#FFD1A6",
    borderTopWidth: 1,
    borderTopColor: "#606060",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default GameMenu;
