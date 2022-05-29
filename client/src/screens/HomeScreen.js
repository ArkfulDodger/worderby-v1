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

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);

  React.useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);

  const fetchData = () => {
    console.log("HOME DATA FETCH CALLED -------------------------");

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
    return <GameCard game={game} />;
  };

  const onLogoutPress = () => {
    // unsubscribe();

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
      {/* <Button title="Send Ping" onPress={onSendPress} /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingTop: 30,
    padding: 8,
  },
});

export default HomeScreen;
