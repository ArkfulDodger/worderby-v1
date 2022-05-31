import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { UrlContext, UserContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../screens/LoadingScreen";
import FriendCard from "../components/home/FriendCard";
import GText from "../components/tools/GText";

const FriendsListScreen = (props) => {
  const URL = useContext(UrlContext);
  const { user } = useContext(UserContext);
  navigation = useNavigation();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    refreshFriendList();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      refreshFriendList();
    });

    return willFocusSubscription;
  }, []);

  const refreshFriendList = () => {
    fetch(URL + "/users")
      .then((res) => res.json())
      .then((allUsers) =>
        setFriends(
          allUsers.filter((friend) => friend.id !== user.id && !friend.is_bot)
        )
      )
      .catch((error) => console.log(error.message));
  };

  const renderFriendCard = (friend) => {
    return <FriendCard friend={friend} refresh={refreshFriendList} />;
  };

  if (friends.length < 1) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <View style={{ alignItems: "center", margin: 30 }}>
        <GText style={{ fontWeight: "bold", fontSize: 20 }}>Friends</GText>
      </View>
      <FlatList
        data={friends}
        renderItem={renderFriendCard}
        keyExtractor={(friend) => friend.id}
      />
    </View>
  );
};

export default FriendsListScreen;
