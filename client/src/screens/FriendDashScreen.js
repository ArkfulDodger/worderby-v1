import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import FriendProfileScreen from "./FriendProfileScreen";
import FriendsListScreen from "./FriendsListScreen";
import { useNavigation } from "@react-navigation/native";

const FriendDashScreen = (props) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Friend Dashboard</Text>
      <Button
        title="FriendsList"
        onPress={() => navigation.navigate("Friends")}
      />
      <Button
        title="FriendProfile"
        onPress={() => navigation.navigate("FriendProfile")}
      />
    </View>
  );
};

export default FriendDashScreen;
