import React from 'react';
import {Provider} from 'react-redux';
import store from './client/store';
import Route from './client/components/Route';
import Navigator from './routes/tab';
import GameOver from './client/components/GameOver';

export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Route />
        {/* <Navigator /> */}
      </Provider>
    </React.Fragment>
  );
}
