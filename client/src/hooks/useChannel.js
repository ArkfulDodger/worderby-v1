import React, { useState, useEffect, useContext, useRef } from "react";

export default function useChannel(ws, channel, id) {
  useEffect(() => {
    subscribe();

    return () => unsubscribe();
  }, []);

  const subscribe = () => {
    console.log("Subscribing to", channel, "| id:", id);
    const subscription = {
      command: "subscribe",
      identifier: JSON.stringify({ channel: channel, id: id }),
    };

    ws.send(JSON.stringify(subscription));
  };

  const unsubscribe = () => {
    console.log("Unsubscribing from", channel, "| id:", id);

    const closeSubscription = {
      command: "unsubscribe",
      identifier: JSON.stringify({ channel: channel, id: id }),
    };

    ws.send(JSON.stringify(closeSubscription));
  };
}
