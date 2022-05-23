import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import GameHeader from "./game/GameHeader";
import PlayerTurnFrame from "./game/PlayerTurnFrame";
import OpponentTurnFrame from "./game/OpponentTurnFrame";
import ResultsFrame from "./game/ResultsFrame";
import GameMenu from "./game/GameMenu";
import LoadingScreen from "./LoadingScreen";
import useURL from "./hooks/useURL";
import useMWAPI from "./hooks/useMWAPI";
import GText from "./tools/GText";

const GameScreen = ({ user }) => {
  //#region STATE & Variables
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [game, setGame] = useState({});
  const {
    is_over: isOver = false,
    turn = 1,
    player1 = {},
    player2 = {},
  } = game;
  const URL = useURL();
  const mwURL = useMWAPI;

  const isOdd = (num) => !!(num % 2);
  const isPlayerTurn =
    (player1.id === user.id && isOdd(turn)) ||
    (player2.id === user.id && !isOdd(turn));

  const [playerInput, setPlayerInput] = useState("");
  const [pNum, setPNum] = useState(1);
  //#endregion

  // load the game, and set loading to false after success
  useEffect(() => {
    fetch(URL + "/games/current")
      .then((res) => res.json())
      .then((gameData) => {
        setGame(gameData);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, []);

  //#region Game Actions
  const getWordToSubmit = () => {
    return game.prompt.text.slice(-pNum) + playerInput;
  };

  const isWordEntry = (data) => {
    return !!data[0].meta;
  };

  const getDataWordString = (data) => {
    return data[0].meta.id.match(/([^:]*)/)[0].toLowerCase();
  };

  const isPlayableWordResponse = (data) => {
    if (isWordEntry(data) && getDataWordString(data) === getWordToSubmit()) {
      return true;
    } else {
      setAlertMessage(
        <>
          <GText>Oops! </GText>
          <GText style={{ fontWeight: "bold" }}>"{getWordToSubmit()}"</GText>
          <GText> was not found in our dictionary! Try another word.</GText>
        </>
      );
      return false;
    }
  };

  const checkWordInDictionary = async (word) => {
    return fetch(mwURL(word))
      .then((res) => res.json())
      .then((data) => isPlayableWordResponse(data))
      .catch((error) => console.log(error.message));
  };

  const getWordScore = () => {
    return pNum * 10 + playerInput.length;
  };

  const playWord = (word) => {
    setAlertMessage("Success! Playing word...");
    fetch(URL + "/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        game_id: game.id,
        round_played: game.round,
        turn_played: game.turn,
        user_id: user.id,
        text: word,
        prompt_text: game.prompt.text,
        p_num: pNum,
        score: getWordScore(),
        is_first_word: false,
      }),
    })
      .then((res) => res.json())
      .then((updatedGameData) => {
        console.log(updatedGameData);
        setGame(updatedGameData);
      })
      .catch((error) => console.log(error.message));
  };

  const onWordSubmit = async () => {
    setAlertMessage("");
    if (playerInput.length === 0) {
      setAlertMessage("Must add at least one letter to play a word!");
      return;
    }
    const word = getWordToSubmit();
    const valid = await checkWordInDictionary(word);

    if (valid) {
      playWord(word);
    }
  };

  //#endregion

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, position: "relative" }}>
        <GameHeader game={game} user={user} />
        <View style={{ flex: 1 }}>
          {isOver ? (
            <ResultsFrame game={game} user={user} />
          ) : isPlayerTurn ? (
            <PlayerTurnFrame
              game={game}
              user={user}
              playerInput={playerInput}
              setPlayerInput={setPlayerInput}
              pNum={pNum}
              setPNum={setPNum}
              alertMessage={alertMessage}
              setAlertMessage={setAlertMessage}
            />
          ) : (
            <OpponentTurnFrame game={game} user={user} />
          )}
        </View>
        <View>
          <GameMenu
            game={game}
            user={user}
            isPlayerTurn={isPlayerTurn}
            onWordSubmit={onWordSubmit}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GameScreen;
