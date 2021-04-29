import React, {FC, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {getMessage} from '../utils/api';
import {isAuthenticated} from '../utils/auth';

import * as keys from "../routers/keys";
import {Button} from "antd";

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

      <Button
        className="pushable"
        style={{
          margin: "18px 0 40px 0"
        }}
        // onClick={() => queryBackend()}
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          Нажми Меня
        </span>
      </Button>
    </>
  );
};
