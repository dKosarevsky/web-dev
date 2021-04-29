import React, {FC, useState} from 'react';
import {Loader} from "./Loader";

import {Input, Button, Tabs, Row, Col} from 'antd';

const {TabPane} = Tabs;

export const Zebrate: FC = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setisLoading] = useState<boolean>(false);
  const default_horse = require("../images/horse.jpeg");
  const default_zebra = require("../images/zebra.jpeg");

  return (
    <>
      <React.Fragment>
        <ul>
          {
            isLoading ?
              <Loader
                loading={isLoading}
                message={''}
                css={''}
                size={80}
              /> :
              null
          }
        </ul>
      </React.Fragment>
      <h1 className="art-idiot-h1">
        Zebrate
      </h1>
      <h2>Превратим вашу лошадь в зебру</h2>
      <br/>
      <h3>Способ загрузки изображения</h3>

      <Tabs defaultActiveKey="1" onChange={() => {
      }}>
        <TabPane tab="Ссылка на изображение" key="1">

          <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col className="gutter-row" span={6}>
              <Input
                placeholder="URL"
                className="art-idiot-input"
                style={{width: "25vw;"}}
              />

              <Button
                className="art-idiot-large-btn"
                type="primary"
                onClick={() => {
                }}
              >
                Отправить
              </Button>
            </Col>
          </Row>

          <br/><img src={default_horse} alt="horse"/>


        </TabPane>

        <TabPane tab="Загрузка с локального устройства" key="2">

          <Button
            className="art-idiot-large-btn"
            type="primary"
            onClick={() => {
            }}
          >
            Загрузить
          </Button>

        </TabPane>
      </Tabs>

      <Button
        className="art-idiot-large-btn"
        style={{
          margin: "18px 0 40px 0"
        }}
      >
        Генерация зебры
      </Button>

      <br/><img src={default_zebra} alt="zebra"/><br/>

      <Row justify="space-between">
        <Button
          className="art-idiot-medium-btn"
          style={{
            margin: "8px 0 0 0"
          }}
        >
          Сохранить
        </Button>

        <Button
          className="art-idiot-medium-btn"
          style={{
            margin: "8px 0 0 0"
          }}
        >
          Поделиться
        </Button>
      </Row>
    </>
  );
};
