import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../App";
import GText from "../components/tools/GText";
// import useURL from "../hooks/useURL";

// const URL = useURL();

const GameCard = ({ game: { item: game } }) => {
  console.log("game", game);

  const URL = useContext(UrlContext);
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  const getGame = () => {
    fetch(URL + `/games/${game.id}`)
      .then((res) => res.json())
      .then((gameData) => {
        console.log("got game data");
        navigation.navigate("Game", { gameData: gameData });
      })
      .catch((error) => console.log(error.message));
  };

  const onGamePress = () => {
    // TODO: set buttons not pressable here
    getGame();
  };

  return (
    <TouchableOpacity
      onPress={onGamePress}
      style={{ width: 300, margin: 10, padding: 5, backgroundColor: "white" }}
    >
      <GText>
        {game.player1.id === user.id
          ? game.player2.username
          : game.player1.username}
      </GText>
      <GText>Round {game.round}</GText>
      <GText>
        {game.player1.id === user.id
          ? game.turn === 1
            ? "Your"
            : game.player2.username + "'s"
          : game.turn === 1
          ? "Your"
          : game.player1.username + "'s"}{" "}
        Turn
      </GText>
    </TouchableOpacity>
  );
};

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);
  console.log("url to log out:", URL);
  console.log("home screen user:", user);

  const renderGameCard = (game) => {
    console.log("rendered game:", game.item.player1.id);
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text>Home Games</Text>
      {/* <Button title="Game" onPress={() => navigation.navigate("Game")} /> */}
      <Button
        title="StartNewGame"
        onPress={() => navigation.navigate("StartNewGame")}
      />
      <Button
        title="UserProfile"
        onPress={() => navigation.navigate("UserProfile")}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <Button title="Logout" onPress={onLogoutPress} />
      <FlatList
        data={user.current_games}
        renderItem={renderGameCard}
        keyExtractor={(game) => game.id}
      />
    </View>
  );
};

export default HomeScreen;
