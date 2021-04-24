import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils/auth';

import * as keys from "../routers/keys";

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#61dafb',
  },
}));

export const Home: FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const classes = useStyles();

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
      {!message && !error && (
        <a className={classes.link} href="#" onClick={() => queryBackend()}>
          Click to make request to backend
        </a>
      )}
      {message && (
        <p>
          <code>{message}</code>
        </p>
      )}
      {error && (
        <p>
          Error: <code>{error}</code>
        </p>
      )}
      <a className={classes.link} href={keys.ADMIN}>
        Admin Dashboard
      </a>
      <a className={classes.link} href={keys.ZEBRATE}>
        Zebrate
      </a>
      <a className={classes.link} href={keys.AI_CHAT}>
        AI Chat
      </a>
      <a className={classes.link} href={keys.VOICE_AI_CHAT}>
        Voice AI Chat
      </a>
      {isAuthenticated() ? (
        <a className={classes.link} href={keys.LOGOUT}>
          Logout
        </a>
      ) : (
        <>
          <a className={classes.link} href={keys.LOGIN}>
            Login
          </a>
          <a className={classes.link} href={keys.SIGNUP}>
            Sign Up
          </a>
        </>
      )}
    </>
  );
};
