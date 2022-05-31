import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditUserProfileScreen from "./EditUserProfileScreen";
import { UserContext } from "../../App";
import GText from "../components/tools/GText";

const UserProfileScreen = (props) => {
  const { user } = useContext(UserContext);
  console.log("user prof user:", user);
  const navigation = useNavigation();

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
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", margin: 20 }}>
        <GText style={{ fontWeight: "bold", fontSize: 20 }}>Profile</GText>
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <GText style={{ fontWeight: "bold" }}>Name: </GText>
          <GText>
            {user.first_name} {user.last_name}
          </GText>
        </View>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <GText style={{ fontWeight: "bold" }}>Games Played: </GText>
          <GText>{user.games_played}</GText>
        </View>
        <View style={{ padding: 20 }}>
          <GText style={{ fontWeight: "bold" }}>Highest Scoring Word</GText>
          <View style={{ flexDirection: "row", margin: 20, marginLeft: 30 }}>
            <GText style={{ fontWeight: "bold" }}>Score: </GText>
            <GText>{user.highest_scoring_word.score}</GText>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 30 }}>
            <GText style={{ fontWeight: "bold" }}>Word: </GText>
            <GText>{user.highest_scoring_word.text}</GText>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        {/* <Button
        title="EditUserProfile"
        onPress={() => navigation.navigate("EditUserProfile")}
      /> */}
        <Button title="Logout" onPress={onLogoutPress} />
      </View>
    </View>
  );
};

export default UserProfileScreen;
