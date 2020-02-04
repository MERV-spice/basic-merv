import React from 'react';
import {Provider} from 'react-redux';
import store from './client/store';
import Route from './client/components/Route';
import Navigator from './routes/tab';
import {Router, Stack, Scene} from 'react-native-router-flux';
import MakeClueCamera from './client/components/MakeClueCamera';
import GameOver from './client/components/GameOver';

export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Route />
        <Router>
          <Scene key="root">
            <Scene key="makeGame" component={MakeGame} title="MakeGame" />
            <Scene
              key="makeClueCamera"
              component={MakeClueCamera}
              title="MakeClueCamera"
            />
          </Scene>
        </Router>
      </Provider>
    </React.Fragment>
  );
}
