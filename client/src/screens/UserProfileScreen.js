import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditUserProfileScreen from "./EditUserProfileScreen";
import { UserContext, UrlContext } from "../../App";
import GText from "../components/tools/GText";
import PButton from "../components/tools/PButton";
import WordScore from "../components/game/WordScore";
import ApMediumText from "../components/tools/ApMediumText";

const UserProfileScreen = (props) => {
  const { user, setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);
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
      <View style={{ alignItems: "center", margin: 30 }}>
        <ApMediumText style={{ fontSize: 30 }}>Profile</ApMediumText>
      </View>
      <View style={{ flex: 1, padding: 15 }}>
        <View style={{ flexDirection: "row", padding: 15 }}>
          <GText style={{ fontWeight: "bold", fontSize: 20 }}>Name: </GText>
          <GText style={{ fontSize: 20 }}>
            {user.first_name} {user.last_name}
          </GText>
        </View>
        <View style={{ flexDirection: "row", padding: 15 }}>
          <GText style={{ fontWeight: "bold", fontSize: 20 }}>Username: </GText>
          <GText style={{ fontSize: 20 }}>{user.username}</GText>
        </View>
        <View style={{ flexDirection: "row", padding: 15 }}>
          <GText style={{ fontWeight: "bold", fontSize: 20 }}>Email: </GText>
          <GText style={{ fontSize: 20 }}>{user.email}</GText>
        </View>
        <View style={{ flexDirection: "row", padding: 15 }}>
          <GText style={{ fontWeight: "bold", fontSize: 20 }}>
            Games Played:{" "}
          </GText>
          <GText style={{ fontSize: 20 }}>{user.games_played}</GText>
        </View>
        {user.highest_scoring_word ? (
          <>
            <View style={{ flexDirection: "row", padding: 15 }}>
              <GText style={{ fontWeight: "bold", fontSize: 20 }}>
                Highest Scoring Word:{" "}
              </GText>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <WordScore prompt={user.highest_scoring_word} />
              </View>
            </View>
          </>
        ) : null}
      </View>
      <View style={{ marginBottom: 30, alignItems: "center" }}>
        {/* <Button
        title="EditUserProfile"
        onPress={() => navigation.navigate("EditUserProfile")}
      /> */}
        <PButton
          onPress={onLogoutPress}
          style={{
            width: 200,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          Logout
        </PButton>
      </View>
    </View>
  );
};

export default UserProfileScreen;
