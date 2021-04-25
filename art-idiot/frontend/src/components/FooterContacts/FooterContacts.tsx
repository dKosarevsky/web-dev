import React, {FC, useState} from 'react';
import {useHistory} from 'react-router';

import Preloader from "../../components/Preloader";

import * as keys from "../../routers/keys";
import "./styles/index.css";

export const FooterContacts: FC = () => {
  const history = useHistory();

  const [error, setError] = useState<string>('');

  return (
    <>
    </>
  )
};