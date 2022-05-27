import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../App";
import GText from "../components/tools/GText";
import GameCard from "../components/home/GameCard";
import {
  useActionCable,
  useChannel,
} from "@aersoftware/react-use-action-cable";

const HomeScreen = (props) => {
  const navigation = useNavigation();

  const { user, setUser } = useContext(UserContext);
  // console.log("home screen user:", user);

  const URL = useContext(UrlContext);

  const { actionCable } = useActionCable(URL + "/cable");
  const { subscribe, unsubscribe, send } = useChannel(actionCable);

  const renderGameCard = (game) => {
    // console.log("rendered game:", game.item.player1.id);
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
