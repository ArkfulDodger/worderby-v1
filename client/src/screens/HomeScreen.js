import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = (props) => {
  const navigation = useNavigation();

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
      <Button title="Game" onPress={() => navigation.navigate("Game")} />
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
    </View>
  );
};

export default HomeScreen;
