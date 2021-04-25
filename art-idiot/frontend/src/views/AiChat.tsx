import React, {FC, useState} from 'react';
import {getRuGPT3Answer} from "../utils";

export const AiChat: FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const queryBackend = async () => {
    try {
      const message = await getRuGPT3Answer();
      setMessage(message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <h1>AI chat</h1>
      <h3>Чат с Artificial idiot на базе ruGPT-3</h3>
      <br/>
      <h3>Напишите сообщение и дождитесь ответ от искусственного интелекта</h3>

      <input/>
      <button
        onClick={() => queryBackend()}
      >
        Отправить соообщение
      </button>
      <br/>

      <textarea placeholder={message} />
      <button>Поделиться</button>
    </>
  );
};
