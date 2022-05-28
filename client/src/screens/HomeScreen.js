import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../App";
import GText from "../components/tools/GText";
import GameCard from "../components/home/GameCard";
// import {
//   useActionCable,
//   useChannel,
// } from "@aersoftware/react-use-action-cable";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);
  const WSURL = URL.replace(/https?:\/\//, "ws://");

  //#region WebSocket

  const [serverState, setServerState] = React.useState("Loading...");
  const [messageText, setMessageText] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true);
  const [serverMessages, setServerMessages] = React.useState([]);
  const [ws, setWs] = useState();
  // var ws = useRef(null);

  useEffect(() => {
    wsInit = new WebSocket(WSURL + "/cable");
    setWs(wsInit);
    console.log("ws", wsInit);

    const serverMessagesList = [];

    wsInit.onopen = () => {
      setServerState("Connected to the server");
      setDisableButton(false);
    };

    wsInit.onclose = (e) => {
      setServerState("Disconnected. Check internet or server.");
      setDisableButton(true);
    };

    wsInit.onerror = (e) => {
      setServerState(e.message);
    };

    wsInit.onmessage = (e) => {
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };
  }, []);

  const submitMessage = () => {
    const message = {
      identifier: JSON.stringify({ channel: "TurnChannel", id: user.id }),
      command: "message",
      data: JSON.stringify({ action: "shoutout", text: messageText }),
    };
    ws.send(JSON.stringify(message));
    setMessageText("");
    setInputFieldEmpty(true);
  };

  //#endregion

  const renderGameCard = (game) => {
    return <GameCard game={game} />;
  };

  const onLogoutPress = () => {
    fetch(URL + "/logout", {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log("successful deletion");
          setUser(null);
        } else {
          console.log("could not log out!");
        }
      })
      .catch((error) => alert(error.message));
  };

  const subscribe = () => {
    console.log("Subscribe Clicked");
    const subscription = {
      command: "subscribe",
      identifier: JSON.stringify({ channel: "TurnChannel", id: user.id }),
    };

    ws.send(JSON.stringify(subscription));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
          backgroundColor: "#eeceff",
          padding: 5,
        }}
      >
        <Text>{serverState}</Text>
      </View>
      <View
        style={{
          backgroundColor: "#ffeece",
          padding: 5,
          height: 500,
        }}
      >
        <ScrollView>
          {serverMessages.map((item, ind) => {
            return <Text key={ind}>{item}</Text>;
          })}
        </ScrollView>
      </View>
      <View
        style={{
          height: 40,
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            flexGrow: 1,
            padding: 5,
          }}
          placeholder={"Add Message"}
          onChangeText={(text) => {
            setMessageText(text);
            setInputFieldEmpty(text.length > 0 ? false : true);
          }}
          value={messageText}
        />
        <Button
          onPress={submitMessage}
          title={"Submit"}
          disabled={disableButton || inputFieldEmpty}
        />
      </View>
      <View
        style={{
          height: 40,
          flexDirection: "row",
        }}
      >
        <Button
          onPress={subscribe}
          title={"Subscribe"}
          // disabled={disableButton || inputFieldEmpty}
        />
      </View>
    </View>
  );

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: "center",
  //       alignItems: "center",
  //       padding: 10,
  //     }}
  //   >
  //     <Text>Home Games</Text>
  //     <Button title="Send Ping" onPress={onSendPress} />
  //     <Button
  //       title="StartNewGame"
  //       onPress={() => navigation.navigate("StartNewGame")}
  //     />
  //     <Button
  //       title="UserProfile"
  //       onPress={() => navigation.navigate("UserProfile")}
  //     />
  //     <Button
  //       title="Settings"
  //       onPress={() => navigation.navigate("Settings")}
  //     />
  //     <Button title="Logout" onPress={onLogoutPress} />
  //     <FlatList
  //       data={user.current_games}
  //       renderItem={renderGameCard}
  //       keyExtractor={(game) => game.id}
  //     />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingTop: 30,
    padding: 8,
  },
});

export default HomeScreen;
