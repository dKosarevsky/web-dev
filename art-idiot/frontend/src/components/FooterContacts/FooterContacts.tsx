import React, {FC, useState} from 'react';
import {useHistory} from 'react-router';

import * as keys from "../../routers/keys";
import "./styles/index.css";

import {ReactComponent as TelegramIcon} from '../Icons/Telegram.svg';
import {ReactComponent as ArtIdiotIcon} from "../Icons/ArtIdiot.svg";

export const FooterContacts: FC = () => {
  const history = useHistory();

  const [error, setError] = useState<string>('');

  return (
    <div className="art-idiot-footer-container">

      <div className="art-idiot-header-left">
          <span
            className="art-idiot-logo art-idiot-logo-header"
            onClick={() => {
              history.replace(keys.HOME);
            }}
          >
            <ArtIdiotIcon/>
          </span>
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

        <span className="art-idiot-tg-ico">
          <a href="https://t.me/art_idiot" target="_blank">
            <svg width="20" height="20">
              <TelegramIcon/>
            </svg>
          </a>
        </span>
      </div>

    </div>
  )
};