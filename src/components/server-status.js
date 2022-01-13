import React, { useEffect, useState, useRef } from "react";
import { WebSocket } from "nextjs-websocket";
import styles from "./server-status.module.scss";

export default function ServerStatus({ url }) {
  const [websocketData, setWebsocketData] = useState();
  const [websocketState, setWebsocketState] = useState("Connecting...");
  let interval;
  const websocketRef = useRef(null);

  const ping = () => {
    if (websocketRef.current) {
      websocketRef.current.sendMessage("ping");
    }
  };

  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [interval]);

  return (
    <div>
      {websocketData ? (
        <div
          className={styles["server-status"]}
          style={{ color: websocketData.color }}
        >
          <div>{websocketData.message}</div>
        </div>
      ) : (
        websocketState
      )}

      <WebSocket
        url={url}
        ref={websocketRef}
        onMessage={(received) => {
          setWebsocketData({
            message: received.replaceAll('"', ""),
            color: randomColor(),
          });
        }}
        onOpen={() => {
          // console.log("WebSocket connection opened");
          ping();
          interval = setInterval(() => {
            ping();
          }, 5000);
          setWebsocketState("connected");
        }}
        onClose={() => {
          // console.log("WebSocket connection closed");
          setWebsocketState("disconnected");
        }}
        onError={() => {
          // console.log("WebSocket connection error");
          setWebsocketState("error");
        }}
        debug={true}
      />
    </div>
  );
}
