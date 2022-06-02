import React from "react";
import { Button } from "react-native";
import Tts from "react-native-tts";

Tts.setDefaultLanguage("en-GB");
Tts.setDefaultVoice("com.apple.ttsbundle.Daniel-compact");

const NativeSpeech = () => (
  <Button title="Speak!" onPress={() => Tts.speak("Hello World!")} />
);

export default NativeSpeech;
