import React, {FC, useState} from 'react';
import {Loader} from "./Loader";

import {Input, Button, Tabs, Row, Col, Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {sendZebrateLink} from "../utils";

const {TabPane} = Tabs;
const {Dragger} = Upload;


export const Zebrate: FC = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const default_horse = require("../images/horse.jpeg");
  const default_zebra = require("../images/zebra.jpeg");
  const [userLink, setUserLink] = useState<string>('');
  const [horse, setHorse] = useState<string>('');
  const [zebra, setZebra] = useState<string>('');

  // const props = {
  //   name: 'file',
  //   multiple: false,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange(info: { file: { name?: any; status?: any; }; fileList: any; }) {
  //     const {status} = info.file;
  //     if (status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };


  const queryBackend = async () => {
    try {
      setIsLoading(true);
      const ZebraImg = await sendZebrateLink(userLink);
      console.log(ZebraImg)
      setZebra(ZebraImg);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };


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
      <h3>Способ передачи изображения</h3>

      <Tabs defaultActiveKey="1" onChange={() => {
      }}>
        <TabPane tab="Ссылка на изображение" key="1">

          <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col className="gutter-row" span={6}>
              <Input
                placeholder="URL"
                className="art-idiot-input"
                style={{width: "25vw;"}}
                onChange={event => setUserLink(event.target.value)}
              />

            </Col>
          </Row>

          <br/>
          <img
            src={userLink ? userLink : default_horse}
            alt="horse"
          />
        </TabPane>

      {/*  <TabPane tab="Загрузка с локального устройства" key="2">*/}
      {/*    <Dragger {...props}>*/}
      {/*      <p className="ant-upload-drag-icon">*/}
      {/*        <InboxOutlined/>*/}
      {/*      </p>*/}
      {/*      <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
      {/*      <p className="ant-upload-hint">*/}
      {/*        Support for a single upload. Strictly prohibit from uploading company data or other*/}
      {/*        band files*/}
      {/*      </p>*/}
      {/*    </Dragger>*/}
      {/*  </TabPane>*/}

      </Tabs>

      <Button
        className="art-idiot-large-btn"
        style={{
          margin: "18px 0 40px 0"
        }}
        onClick={() => {
          queryBackend()
        }}
      >
        Генерация зебры
      </Button>

      <br/>
      <img
        src={zebra ? `data:image/png;base64,${zebra}` : default_zebra}

        alt="zebra"
      />
      <br/>

      <Row justify="space-between">
        <Button
          className="art-idiot-medium-btn"
          style={{
            margin: "8px 0 0 0"
          }}
          onClick={() => {
            console.log(zebra)
        }}
        >
          Сохранить
        </Button>
      </Row>
    </>
  );
};
