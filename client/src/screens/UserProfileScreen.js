import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditUserProfileScreen from "./EditUserProfileScreen";

const UserProfileScreen = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>User Profile</Text>
      <Button
        title="EditUserProfile"
        onPress={() => navigation.navigate("EditUserProfile")}
      />
    </View>
  );
};

export default UserProfileScreen;
