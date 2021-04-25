import React, {FC, useState} from 'react';
import {sendRuGPT3Question} from "../utils";

import {Form, Input, Button} from 'antd';

const {TextArea} = Input;

export const AiChat: FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string>('');

  const queryBackend = async () => {
    try {
      const AiAnswer = await sendRuGPT3Question(question);
      setAnswer(AiAnswer);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>

      <h1 className="art-idiot-h1">
        AI chat
      </h1>

      <h2>Чат с Artificial idiot на базе ruGPT-3</h2>
      <br/>
      <h3>Подискутируйте с искусственным интеллектом</h3>

      <Form
        onFinish={() => queryBackend()}
      >
        <Input
          className="art-idiot-input"
          placeholder={"Ваше сообщение: "}
          onChange={event => setQuestion(event.target.value)}
        />
        <br/>
        <Button
          className="art-idiot-large-btn"
          style={{
            margin: "18px 0 40px 0"
          }}
          // type="submit"
          onClick={() => queryBackend()}
        >
          Отправить сообщение
        </Button>
      </Form>

      <br/>

      <TextArea
        className="art-idiot-input"
        style={{
          height: "180px"
        }}
        placeholder={`Artificial idiot: ${answer ? answer : error}`}
      />
      <Button
        className="art-idiot-medium-btn"
        style={{
          margin: "18px 0 0 0"
        }}
      >
        Скопировать
      </Button>
    </>
  );
};
