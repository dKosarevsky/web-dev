import React, {FC, useState} from 'react';
import {Button} from "antd";
import {getMessage} from "../utils";

export const VoiceAiChat: FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const queryBackend = async () => {
    try {
      const message = await getMessage();
      setMessage(message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <h1 className="art-idiot-h1">
        Voice AI chat
      </h1>

      <h2>Голосовой чат с Artificial idiot</h2>

      <h2>... в разработке ...</h2>

      <br/>
      <Button
        className="pushable"
        style={{
          margin: "18px 0 40px 0"
        }}
        onClick={() => queryBackend()}
      >
        <span className="shadow"> </span>
        <span className="edge"> </span>
        <span className="front">
          Нажми Меня
        </span>
      </Button>
    </>
  );
};
