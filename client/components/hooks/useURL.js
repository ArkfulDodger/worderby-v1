import React, { useState, useEffect } from "react";
import { Platform } from "react-native";

function useURL() {
  return Platform.OS === "ios"
    ? "http://localhost:3000"
    : "http://10.0.2.2:3000";
}

export default useURL;
