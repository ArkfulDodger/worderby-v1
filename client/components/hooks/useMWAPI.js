import React from "react";

const MWURL1 =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
const MWURL2 = "?key=a2d218bc-85bb-481b-aa42-1f04c84aa4a8";

function useMWAPI(word) {
  return MWURL1 + word + MWURL2;
}

export default useMWAPI;
