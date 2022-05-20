import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, Button } from "react-native";

const RANDURL = "https://random-words-api.vercel.app/word";
const MWURL1 =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
const MWURL2 = "?key=a2d218bc-85bb-481b-aa42-1f04c84aa4a8";

const WordTest = (props) => {
  const [word, setWord] = useState(null);
  const [def, setDef] = useState(null);

  useEffect(() => {
    setWord(null);
    setDef(null);
    getNewRandWord();
  }, []);

  const getNewRandWord = () => {
    fetch(RANDURL)
      .then((res) => res.json())
      .then((randWord) => {
        const word = randWord[0].word
          ? randWord[0].word.toLowerCase()
          : randWord[0].toLowerCase();
        searchMW(word);
      })
      .catch((error) => console.log(error.message));
  };

  const searchMW = (word) => {
    fetch(MWURL1 + word + MWURL2)
      .then((res) => res.json())
      .then((data) => {
        if (!!data[0].shortdef) {
          console.log("MW:", data);
          setWord(word);
          setDef(data[0].shortdef[0]);
          // setDef(data[0].shortdef[0]);
        } else {
          getNewRandWord();
          console.log("MW:", data);
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 10 }}>
        {word || <ActivityIndicator />}
      </Text>
      <View
        style={{
          // flex: 1,
          width: 200,
          height: 200,
          backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>{def || <ActivityIndicator />}</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Button title={"Reload"} onPress={() => getNewRandWord()} />
      </View>
    </View>
  );
};

export default WordTest;
