import React, {FC, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../utils/auth';

import * as keys from "../routers/keys";

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#0099FF',
  },
}));

export const Home: FC = () => {
  const classes = useStyles();
  const art_idiot = require("../images/art-idiot.jpg");

  return (
    <>
      <h1 className="art-idiot-h1">
        Artificial idiot
      </h1>

      <div>
        <img
          style={{
            position: "absolute",
            right: "0",
          }}
          src={art_idiot}
          alt="artificial idiot"
        />
      </div>

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
