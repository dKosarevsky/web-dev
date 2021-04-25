import React, {FC} from 'react';
import {connect, Provider} from "react-redux";
import {Switch, Router, Route} from 'react-router-dom';
import {useHistory} from 'react-router';
import {makeStyles} from '@material-ui/core/styles';

import {
  Home,
  Login,
  SignUp,
  Zebrate,
  AiChat,
  VoiceAiChat,
  PrivateRoute
} from './views';
import {Admin} from './admin';
import {logout} from './utils/auth';
import {HeaderLogOut} from "./components/HeaderLogOut/HeaderLogOut";

import * as keys from "./routers/keys";

// import {PersistGate} from "redux-persist/es/integration/react";
import {Layout, ConfigProvider} from "antd";
import ruRU from 'antd/lib/locale/ru_RU';

const {Header, Footer} = Layout;

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'center',
  },
  header: {
    minHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
  },
}));

export const Routes: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ConfigProvider locale={ruRU}>
      {/*<Provider store={store}>*/}
      {/*<PersistGate persistor={persistor}>*/}
      <Layout className="layout-wrapper">
        <Header>
          <HeaderLogOut/>
        </Header>
        <Switch>
          <Route path={keys.ADMIN}>
            <Admin/>
          </Route>

          <div className={classes.app}>
            <div className={classes.header}>
              <Route path={keys.LOGIN} component={Login}/>
              <Route path={keys.SIGNUP} component={SignUp}/>
              <Route path={keys.LOGOUT} render={() => {
                logout();
                history.push('/');
                return null;
              }}
              />
              <PrivateRoute path={keys.ZEBRATE} component={Zebrate}/>
              <PrivateRoute path={keys.AI_CHAT} component={AiChat}/>
              <PrivateRoute path={keys.VOICE_AI_CHAT} component={VoiceAiChat}/>
              <Route exact path={keys.HOME} component={Home}/>
            </div>
          </div>
        </Switch>
        <Footer>
          TODO Футер
        </Footer>
      </Layout>
      {/*</PersistGate>*/}
      {/*</Provider>*/}
    </ConfigProvider>
  );
};
