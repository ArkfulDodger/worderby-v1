import React, { useState, useEffect, useContext, useRef } from "react";

export default function useWebSocket(URL = "http://localhost:3000") {
  const [serverConnected, setServerConnected] = useState(false);

  const [serverMessages, setServerMessages] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const WSURL = URL.replace(/https?:\/\//, "ws://");
    const wsInit = new WebSocket(WSURL + "/cable");
    setWs(wsInit);

    const serverMessagesList = [];

    wsInit.onopen = () => {
      console.log("--------WebSocket Server Connected--------");
      setServerConnected(true);
    };

    wsInit.onclose = (e) => {
      console.log("--------WebSocket Server Disconnected--------");
      setServerConnected(false);
    };

    wsInit.onerror = (e) => {
      console.log("WebScocket Error:", e.message);
    };

    wsInit.onmessage = (e) => {
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };
  }, []);

  const submitMessage = (channel, id, action, obj) => {
    const message = {
      identifier: JSON.stringify({ channel: channel, id: id }),
      command: "message",
      data: JSON.stringify({ action: action, ...obj }),
    };
    ws.send(JSON.stringify(message));
  };

  return { ws, serverConnected, serverMessages, submitMessage };
}
