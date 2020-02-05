import React from 'react';
import {Provider} from 'react-redux';
import store from './client/store';
import Route from './client/components/Route';
import GameOver from './client/components/GameOver';
export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        {/* <GameOver /> */}
        <Route />
      </Provider>
    </React.Fragment>
  );
}
