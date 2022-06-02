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
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../App";
import GText from "../components/tools/GText";
import ApMediumText from "../components/tools/ApMediumText";
import PButton from "../components/tools/PButton";
import GameCard from "../components/home/GameCard";
import LinearGradient from "react-native-linear-gradient";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);

  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);

  const fetchData = () => {
    // console.log("HOME DATA FETCH CALLED -------------------------");

    fetch(`${URL}/me`)
      .then((r) => {
        if (r.ok) {
          r.json().then((userData) => {
            setUser(userData);
          });
        } else {
          console.log("user not logged in");
          setUser(null);
        }
      })
      .catch((error) => console.error(Platform.OS, "error:", error));
  };

  const renderGameCard = (game) => {
    return <GameCard game={game} refresh={fetchData} />;
  };

  // const onLogoutPress = () => {
  //   // unsubscribe();

  //   fetch(URL + "/logout", {
  //     method: "DELETE",
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         console.log("successful deletion");
  //         setUser(null);
  //       } else {
  //         console.log("could not log out!");
  //       }
  //     })
  //     .catch((error) => alert(error.message));
  // };

  const currentSinglePlayerGame = () => {
    // console.log("curGames:", user.current_games[0]);
    for (let i = 0; i < user.current_games.length; i++) {
      const game = user.current_games[i];
      if (game.is_single_player) {
        return game;
      }
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
      }}
    >
      <View style={{ alignItems: "center", margin: 30 }}>
        <ApMediumText style={{ fontSize: 30 }}>Current Games</ApMediumText>
      </View>
      {/* <Button title="Send Ping" onPress={onSendPress} /> */}
      <PButton
        onPress={() => {
          const spg = currentSinglePlayerGame();
          navigation.navigate("StartNewGame", {
            currentSinglePlayerGame: spg,
          });
        }}
      >
        Start New Game
      </PButton>
      {/* <Button
        title="UserProfile"
        onPress={() => navigation.navigate("UserProfile")}
      /> */}
      {/* <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      /> */}
      {/* <Button title="Logout" onPress={onLogoutPress} /> */}
      <FlatList
        data={user.current_games}
        renderItem={renderGameCard}
        keyExtractor={(game) => game.id}
      />
    </View>
  );
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
