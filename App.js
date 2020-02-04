import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png';
import GamesPage from './client/components/GamesPage';
import CluePage from './client/components/CluePage';
import NavBar from './client/components/NavBar';
import HomePage from './client/components/HomePage';
import Gps from './client/components/Gps';
import CameraComponent from './client/components/Camera';
import MakeGame from './client/components/MakeGame'
import { Provider } from 'react-redux';
import store from './client/store';
import Route from './client/components/Route';
import Navigator from './routes/tab';
import { Router, Stack, Scene } from 'react-native-router-flux';
import MakeClueCamera from './client/components/MakeClueCamera';
import GameOver from './client/components/GameOver';
export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
          {/* <HomePage /> */}
          {/* <Gps /> */}
          {/* <NavBar /> */}
          {/* <Navigator /> */}
          {/* <CluePage /> */}
          {/* <Route />
        <GameOver />
        <CameraComponent /> */}
        <Router>
          <Scene key='root'>
            <Scene key='makeGame' component={MakeGame} title="MakeGame" />
            <Scene key='makeClueCamera' component={MakeClueCamera} title="MakeClueCamera" />
          </Scene>
        </Router>
      </Provider>
    </React.Fragment>
  );
}

