import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
// import useURL from "../hooks/useURL";
import useMWAPI from "../hooks/useMWAPI";
import LoadingScreen from "./LoadingScreen";
import GText from "../components/tools/GText";
import PlayerTurnFrame from "../components/game/frames/PlayerTurnFrame";
import OpponentTurnFrame from "../components/game/frames/OpponentTurnFrame";
import ResultsFrame from "../components/game/frames/ResultsFrame";
import GameHeader from "../components/game/header/GameHeader";
import GameMenu from "../components/game/menu/GameMenu";
import { UserContext, UrlContext } from "../../App";

const GameScreen = ({
  route: {
    params: { gameData },
  },
}) => {
  // console.log("gameData:", gameData);
  // context variables
  const { user, setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);
  // console.log("CURRENT GAME user:", user);

  //#region STATE & Variables
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [game, setGame] = useState(gameData);

  const { is_over: isOver, turn, player1, player2 } = game;
  const mwURL = useMWAPI;

  const isOdd = (num) => !!(num % 2);
  const isPlayerTurn =
    (player1.id === user.id && isOdd(turn)) ||
    (player2.id === user.id && !isOdd(turn));

  const isReadyToContinue = isWordPlayedThisRound();
  console.log("isReadyToContinue:", isReadyToContinue);

  const [playerInput, setPlayerInput] = useState("");
  const [pNum, setPNum] = useState(1);
  //#endregion

  //#region WebSocket

  const WSURL = URL.replace(/https?:\/\//, "ws://");
  const [isServerConnected, setIsServerConnected] = useState(false);
  // const [messageText, setMessageText] = useState("");
  // const [disableButton, setDisableButton] = useState(true);
  // const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  // const [serverMessages, setServerMessages] = React.useState([]);
  // const [ws, setWs] = useState();
  var ws = useRef();

  useEffect(() => {
    // create web socket connection
    wsInit = new WebSocket(WSURL + "/cable");

    // set state to make it accessible
    ws.current = wsInit;
    // setWs(wsInit);

    // const serverMessagesList = [];

    wsInit.onopen = () => {
      console.log(
        Platform.OS + ": " + "--------WebSocketServer is Connected--------"
      );
      setIsServerConnected(true);
      // setDisableButton(false);
    };

    wsInit.onclose = (e) => {
      console.log(
        Platform.OS + ": " + "--------WebSocket Server Disconnected--------"
      );
      setIsServerConnected(false);
      // setDisableButton(true);
    };

    wsInit.onerror = (e) => {
      console.error("WebSocket Error:", e.message);
      // setIsServerConnected(e.message);
    };

    wsInit.onmessage = (e) => {
      if (isPing(JSON.parse(e.data))) {
        // console.log("received ping");
      } else if (JSON.parse(e.data).type === "welcome") {
        console.log(Platform.OS + ": " + "Successfully Connected");
      } else if (JSON.parse(e.data).type === "confirm_subscription") {
        console.log(Platform.OS + ": " + "Successfully Subscribed");
      } else if (isOtherTurnPlayedMessage(JSON.parse(e.data))) {
        refreshGame();
        console.log(Platform.OS + ": " + "instigating game refresh");
      }
      // serverMessagesList.push(e.data);
      // setServerMessages([...serverMessagesList]);
    };

    setTimeout(() => {
      subscribe();
    }, 500);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(Platform.OS + ": " + "GAME UPDATED:", game);
  }, [game]);

  useEffect(() => {
    console.log(Platform.OS + ": " + "USER UPDATED:", user);
  }, [user]);

  const isPing = (message) => {
    return message.type === "ping";
  };

  const getPairingId = () => {
    const p1id = game.player1.id;
    const p2id = game.player2.id;

    if (p1id < p2id) {
      return `${p1id}_${p2id}`;
    } else {
      return `${p2id}_${p1id}`;
    }
  };

  const isOtherTurnPlayedMessage = (message) => {
    console.log(Platform.OS + ": " + "message:", message);
    console.log(Platform.OS + " isPlayerTurn:" + isPlayerTurn);
    console.log(Platform.OS + " message player:" + message.message.player);
    console.log(Platform.OS + " user.id:" + user.id);
    if (
      message.message.body === "turn played" &&
      message.message.player !== user.id
    ) {
      return true;
    }
  };

  function isWordPlayedThisRound() {
    const round = game.round;
    const turn = game.turn;
    const wordThisRound = game.words.find(
      (word) => word.round_played === round && word.turn_played === turn
    );
    console.log("word this round:", wordThisRound);
    console.log("last game word:", game.words[game.words.length - 1]);

    return !!wordThisRound;
  }

  const submitWordPlayedMessage = (action, messageObj) => {
    const message = {
      identifier: JSON.stringify({
        channel: "TurnChannel",
        id: getPairingId(),
      }),
      command: "message",
      data: JSON.stringify({ action: "turn_played" }),
    };
    ws.current.send(JSON.stringify(message));
    // setMessageText("");
    // setInputFieldEmpty(true);
  };

  const subscribe = () => {
    console.log("Subscribing...");
    // console.log("game:", game);
    const subscription = {
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "TurnChannel",
        id: getPairingId(),
      }),
    };

    ws.current.send(JSON.stringify(subscription));
  };

  const unsubscribe = () => {
    console.log(Platform.OS + ": " + "Unsubscribing...");
    console.log(Platform.OS + ": " + "ws:", ws);

    debugger;

    const closeSubscription = {
      command: "unsubscribe",
      identifier: JSON.stringify({
        channel: "TurnChannel",
        id: getPairingId(),
      }),
    };

    ws.current.send(JSON.stringify(closeSubscription));
  };

  // #endregion

  //#region Game Actions
  const getWordToSubmit = () => {
    return game.prompt.text.slice(-pNum) + playerInput;
  };

  const isWordEntry = (data) => {
    return !!data[0].meta;
  };

  const isWordInStems = (data, word) => {
    return data[0].meta.stems.find(
      (s) => s.toLowerCase() === word.toLowerCase()
    );
  };

  const refreshGame = () => {
    fetch(URL + `/games/${game.id}`)
      .then((res) => res.json())
      .then((refreshedGameData) => setGame(refreshedGameData))
      .catch((error) => console.log(error.message));
  };

  const isPlayableWordResponse = (data) => {
    if (isWordEntry(data) && isWordInStems(data, getWordToSubmit())) {
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
        setGame(updatedGameData);
        submitWordPlayedMessage();
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

  const playBotTurn = () => {
    fetch(URL + "/words/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        game_id: game.id,
        round_played: game.round,
        turn_played: game.turn,
        user_id: player1.id === user.id ? player1.id : player2.id,
        prompt_text: game.prompt.text,
        is_first_word: false,
      }),
    })
      .then((res) => res.json())
      .then((updatedGameData) => {
        console.log(Platform.OS + ": " + "BOT GAME DATA RETURNED");
        setGame(updatedGameData);
        setAlertMessage("");
      })
      .catch((error) => console.log(error.message));
  };

  const onContinueGame = () => {
    if (game.is_single_player) {
      setAlertMessage("");
      playBotTurn();
    } else {
      console.log("TODO: progress game for multiplayer");
      setAlertMessage("");
      startYourTurn();
    }
  };

  const startYourTurn = () => {
    const updates = {
      turn: game.turn === 1 ? 2 : 1,
      round: game.turn === 1 ? game.round : game.round + 1,
    };

    fetch(URL + `/games/${game.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((updatedGame) => {
        setGame(updatedGame);
        submitWordPlayedMessage();
      })
      .catch((error) => console.log(error.message));
  };

  const onNewGame = () => {
    fetch(URL + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        player1_id: game.player2.id,
        player2_id: game.player1.id,
        is_over: false,
        num_rounds: game.num_rounds,
        round: 1,
        turn: 1,
        player1_score: 0,
        player2_score: 0,
        is_single_player: game.is_single_player,
      }),
    })
      .then((res) => res.json())
      .then((newGameData) => {
        // console.log("newGameData:", newGameData);
        setGame(newGameData);
        setAlertMessage("");
      })
      .catch((error) => console.log(error.message));
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
          ) : isPlayerTurn && !isReadyToContinue ? (
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
            <OpponentTurnFrame
              game={game}
              user={user}
              isPlayerTurn={isPlayerTurn}
              isReadyToContinue={isReadyToContinue}
            />
          )}
        </View>
        <View>
          <GameMenu
            game={game}
            user={user}
            isPlayerTurn={isPlayerTurn}
            onWordSubmit={onWordSubmit}
            onContinueGame={onContinueGame}
            onNewGame={onNewGame}
            isReadyToContinue={isReadyToContinue}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GameScreen;
