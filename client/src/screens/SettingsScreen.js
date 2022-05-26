import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BlockListScreen from "./BlockListScreen";

const SettingsScreen = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Settings</Text>
      <Button
        title="BlockList"
        onPress={() => navigation.navigate("BlockList")}
      />
    </View>
  );
};

export default SettingsScreen;
