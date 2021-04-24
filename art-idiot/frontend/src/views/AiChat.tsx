import React, { FC } from 'react';

export const AiChat: FC = () => {
  return (
      <>
        <h1>AI chat</h1>
        <h3>Чат с Artificial idiot на базе ruGPT-3 от Сбера</h3>
        <br/>
        <h3>Напишите сообщение и дождитесь ответ от искусственного интелекта</h3>
        <input/>
        <button>Отправить соообщение</button>

        <input/>
        <button>Поделиться</button>
      </>
  );
};
