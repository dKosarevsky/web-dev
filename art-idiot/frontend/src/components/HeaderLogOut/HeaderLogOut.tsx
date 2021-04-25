import React, {FC, useState} from 'react';
import {useHistory} from 'react-router';

import Preloader from "../../components/Preloader";

import * as keys from "../../routers/keys";
// import "antd/dist/antd.css";
import "./styles/index.css";

import {Menu, Dropdown, Button} from 'antd';

import {ReactComponent as PersonIcon} from '../Icons/Person.svg';
import {ReactComponent as LogoutIcon} from '../Icons/Logout.svg';
import {ReactComponent as QuestionIcon} from '../Icons/Question.svg';
import {ReactComponent as BellIcon} from '../Icons/Bell.svg';
import {ReactComponent as SmallNumberIcon} from '../Icons/SmallNumber.svg';


export const HeaderLogOut: FC = () => {
  const history = useHistory();

  const [answers, setAnswers] = useState<number>(43);
  const [zebras, setZebras] = useState<number>(14);
  const [notifications, setNotifications] = useState<number>(3);
  const [error, setError] = useState<string>('');

  return (
    <>
      {/*<Preloader loading={isRequest}/>*/}
      <div className="art-idiot-header-container">

        <div className="art-idiot-header-left">
          <span
            className="art-idiot-logo art-idiot-logo-header"
            onClick={() => {
              history.replace(keys.HOME);
            }}
          >
            ЛОГОТИП
          </span>

          <PersonIcon className="art-idiot-person-ico"/>

          <span className="art-idiot-person-name">
            Василий Пупкин {/*TODO fix username!*/}
          </span>

          <span
            onClick={() => {
              history.replace(keys.LOGOUT);
            }}
          >
            <LogoutIcon className="art-idiot-logout-ico"/>
        </span>
        </div>

        <div className="art-idiot-header-right">
          <div className="art-idiot-header-answers">
            <span className="art-idiot-header-answers-text">
                Ответов в чате
            </span>
            <p className="inter-lineage"></p>
            <span className="art-idiot-header-count-text">
                {answers} шт.
            </span>
          </div>

          <div className="art-idiot-header-zebras">
            <span className="art-idiot-header-zebras-text">
              Создано зебр
            </span>
            <p className="inter-lineage"></p>
            <span className="art-idiot-header-count-text">
                {zebras} шт.
            </span>
          </div>

          <QuestionIcon className="art-idiot-q-ico"/>

          <Button
            className="art-idiot-medium-btn art-idiot-medium-btn-admin"
            onClick={() => {
              history.replace(keys.ADMIN);
            }}
          >
            Админка
          </Button>

          <BellIcon className="art-idiot-bell-ico"/>
          {notifications > 0 && (
            <>
              <SmallNumberIcon className="art-idiot-small-num-ico"/>
              <span className="art-idiot-small-num-ico-num">
              {notifications}
            </span>
            </>
          )}
        </div>

        <div className="art-idiot-header-menu">
          <span className="art-idiot-text-btn art-idiot-text-btn-menu" onClick={() => {
            history.replace(keys.HOME);
          }}>
            Main
          </span>
          <span className="art-idiot-text-btn art-idiot-text-btn-menu" onClick={() => {
            history.replace(keys.ZEBRATE);
          }}>
            Zebrate
          </span>
          <span className="art-idiot-text-btn art-idiot-text-btn-menu" onClick={() => {
            history.replace(keys.AI_CHAT);
          }}>
            AI Chat
          </span>
          <span className="art-idiot-text-btn art-idiot-text-btn-menu" onClick={() => {
            history.replace(keys.VOICE_AI_CHAT);
          }}>
            Voice AI Chat
          </span>
        </div>

      </div>
      {/*</Preloader/>*/}
    </>
  )
};
