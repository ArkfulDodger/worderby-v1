import React from "react";
import DeviceInfo from "react-native-device-info";

function useEmulator() {
  return DeviceInfo.isEmulator().then((isEmulator) => {
    // console.log("device is emulator:", isEmulator);

    return isEmulator;
  });
}

export default useEmulator;
