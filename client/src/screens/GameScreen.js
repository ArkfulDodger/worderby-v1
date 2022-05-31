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
  const [rematchOffered, setRematchOffered] = useState(false);
  const [rematchGame, setRematchGame] = useState(null);

  const { is_over: isOver, turn, player1, player2 } = game;
  const mwURL = useMWAPI;

  const isOdd = (num) => !!(num % 2);
  const isPlayerTurn =
    (player1.id === user.id && isOdd(turn)) ||
    (player2.id === user.id && !isOdd(turn));

  const opponent = player1.id === user.id ? player2 : player1;

  const isReadyToContinue = isWordPlayedThisRound();
  // console.log("isReadyToContinue:", isReadyToContinue);

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
      messageData = JSON.parse(e.data);

      if (isPing(messageData)) {
        // console.log("received ping");
      } else if (messageData.type === "welcome") {
        console.log(Platform.OS + ": " + "Successfully Connected");
      } else if (messageData.type === "confirm_subscription") {
        console.log(Platform.OS + ": " + "Successfully Subscribed");
      } else if (isOtherTurnPlayedMessage(messageData)) {
        refreshGame(messageData.message.game_id);
        console.log(Platform.OS + ": " + "instigating game refresh");
      } else if (
        isRematchOfferedMessage(messageData) &&
        !isUserRematchChallenger(messageData)
      ) {
        getRematchGame(messageData.message.game_id);
      } else if (isRematchAcceptedMessage(messageData)) {
        console.log(
          Platform.OS + ": " + "------REMATCH ACCEPTED RECEIVED--------"
        );
        enterRematch(messageData.message.game_id);
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
    if (
      message.message.body === "turn played" &&
      message.message.player !== user.id
    ) {
      return true;
    }
  };

  const isRematchOfferedMessage = (message) => {
    return message.message.body === "rematch offered";
  };

  const isUserRematchChallenger = (message) => {
    return message.message.player === user.id;
  };

  const isRematchAcceptedMessage = (message) => {
    if (message.message.body === "rematch accepted") {
      return true;
    }
  };

  function isWordPlayedThisRound() {
    const round = game.round;
    const turn = game.turn;
    const wordThisRound = game.words.find(
      (word) => word.round_played === round && word.turn_played === turn
    );

    return !!wordThisRound;
  }

  const submitWordPlayedMessage = () => {
    const message = {
      identifier: JSON.stringify({
        channel: "TurnChannel",
        id: getPairingId(),
      }),
      command: "message",
      data: JSON.stringify({ action: "turn_played", game_id: game.id }),
    };
    ws.current.send(JSON.stringify(message));
    // setMessageText("");
    // setInputFieldEmpty(true);
  };

  const submitRematchOfferedMessage = (game_id) => {
    const message = {
      identifier: JSON.stringify({
        channel: "TurnChannel",
        id: getPairingId(),
      }),
      command: "message",
      data: JSON.stringify({ action: "rematch_offered", game_id: game_id }),
    };
    ws.current.send(JSON.stringify(message));
    // setMessageText("");
    // setInputFieldEmpty(true);
  };

  const submitRematchAcceptedMessage = () => {
    const message = {
      identifier: JSON.stringify({
        channel: "TurnChannel",
        id: getPairingId(),
      }),
      command: "message",
      data: JSON.stringify({
        action: "rematch_accepted",
        game_id: rematchGame.id,
      }),
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

  const refreshGame = (game_id) => {
    fetch(URL + `/games/${game_id}`)
      .then((res) => res.json())
      .then((refreshedGameData) => setGame(refreshedGameData))
      .catch((error) => console.log(error.message));
  };

  const getRematchGame = (rematch_id) => {
    fetch(URL + `/games/${rematch_id}`)
      .then((res) => res.json())
      .then((rematchGameData) => {
        setRematchGame(rematchGameData);
        setRematchOffered(true);
        setAlertMessage(
          `${opponent.username} has challenged you to a rematch!`
        );
      })
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
        // if (game.is_single_player) {
        //   setTimeout(() => {
        //     playBotTurn(updatedGameData);
        //   }, 1000);
        // }
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

  const playBotTurn = (game) => {
    console.log("PLAY BOT TURN CALLED");
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
        user_id: player1.id === user.id ? player2.id : player1.id,
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
      startYourTurn();
      // playBotTurn();
    } else {
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

  // used for rematch challenge
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
        is_accepted: game.is_single_player ? true : false,
        challenger_id: user.id,
        challengee_id: opponent.id,
      }),
    })
      .then((res) => res.json())
      .then((newGameData) => {
        setRematchGame(newGameData);
        setRematchOffered(true);
        submitRematchOfferedMessage(newGameData.id);
        setAlertMessage(`Waiting for ${opponent.username}'s response`);
      })
      .catch((error) => console.log(error.message));
  };

  const onAcceptRematch = () => {
    fetch(URL + `/games/${rematchGame.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        is_accepted: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        submitRematchAcceptedMessage();
      })
      .catch((error) => console.log(error.message));
  };

  const enterRematch = (rematch_id) => {
    console.log(
      Platform.OS + ": " + "-----using rematch id: " + rematch_id + "-------"
    );
    fetch(URL + `/games/${rematch_id}`)
      .then((res) => res.json())
      .then((rematchGameData) => {
        console.log(Platform.OS + ": " + "rematchData: " + rematchGameData);
        setAlertMessage(``);
        setRematchOffered(false);
        setRematchGame(null);
        setGame(rematchGameData);
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
            <ResultsFrame game={game} user={user} alertMessage={alertMessage} />
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
              playBotTurn={playBotTurn}
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
            rematchOffered={rematchOffered}
            rematchGame={rematchGame}
            onAcceptRematch={onAcceptRematch}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GameScreen;
