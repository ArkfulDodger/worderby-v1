import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import WordRecord from "../WordRecord";

const WordResults = ({ game }) => {
  const { words } = game;

  const renderWordRecord = (word) => {
    return <WordRecord word={word} />;
  };

  return (
    <FlatList
      data={words}
      renderItem={renderWordRecord}
      keyExtractor={(word) => word.id}
    />
  );
};

export default WordResults;
