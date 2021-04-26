import React, {FC} from 'react'
import {HashLoader} from "react-spinners";
//https://www.davidhu.io/react-spinners/

type LoaderType = {
  loading: boolean;
  message: string;
  css: string;
  size: number;
};

const cssDefault = 'margin-left: -50%; position: absolute; height: 100%; width: 100%; display: flex; z-index: 999; align-items: center; justify-content: center; background: #ffffffc7;'

export const Loader: FC<LoaderType> = ({loading, message, css, size}) => {

  return loading ? (
    <div className='overlay-content'>
      <div className='wrapper'>
        <HashLoader
          css={cssDefault + css}
          size={size}
          color={"#0099FF"}
          loading={loading}
        />
        <span className='message'>
          {message}
        </span>
      </div>
    </div>
  ) : null
};
