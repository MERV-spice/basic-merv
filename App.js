import React from 'react';
import {Provider} from 'react-redux';
import store from './client/store';
import Route from './client/components/Route';
import Navigator from './routes/tab';
import GameOver from './client/components/GameOver';
import SignUp from './client/components/SignUp';
import Login from './client/components/Login';
export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        {/* <Route /> */}
        {/* <GameOver /> */}
        {/* <Navigator /> */}
        <Login />
        <GameOver />
      </Provider>
    </React.Fragment>
  );
}
