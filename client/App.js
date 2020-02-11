import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Route from './components/Route';

export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Route />
      </Provider>
    </React.Fragment>
  );
}
