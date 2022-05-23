import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

function useURL(isEmulator = true) {
  console.log("ISEMULATOR:", isEmulator);
  if (isEmulator) {
    return Platform.OS === "ios"
      ? "http://localhost:3000"
      : "http://10.0.2.2:3000";
  } else {
    return "http://localhost:3000";
    // return "http://10.129.3.56:3000";
  }
}

export default useURL;
