import React from "react";
import {Spin} from "antd";

import './styles/index.css';

const Preloader = ({loading}) => {
  if (loading) {
    return (

      <div className="preloaderWrapper">
        <Spin size="large"/>
      </div>

    );
  } else {
    return null
  }
};

export default Preloader;

