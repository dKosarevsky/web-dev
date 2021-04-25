import React, {FC, useState} from 'react';
import {postRuGPT3Questions} from "../utils";

import {Input, Button} from 'antd';

const {TextArea} = Input;

export const AiChat: FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const queryBackend = async () => {
    try {
      const message = await postRuGPT3Questions(question);
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

      <Input
        placeholder={"Введите вопрос"}
        onChange={event => setQuestion(event.target.value)}
      />
      <Button
        onClick={() => queryBackend()}
      >
        Отправить соообщение
      </Button>
      <br/>

      <TextArea placeholder={`Artificial idiot: ${message ? message : error}`}/>
      <Button>Скопировать ответ</Button>
    </>
  );
};
