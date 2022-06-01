import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

function useURL(isEmulator = true) {
  // return "https://worderby.herokuapp.com/";

  //#region Local Host Solution
  if (isEmulator) {
    return Platform.OS === "ios"
      ? "http://localhost:3000"
      : "http://10.0.2.2:3000";
  } else {
    return "http://localhost:3000";
  }
  //#endregion
}

export default useURL;
