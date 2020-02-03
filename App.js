import React from 'react';
<<<<<<< HEAD
import { /*Navigator*/ Image, StyleSheet, Text, View } from 'react-native';
=======
import { Image, StyleSheet, Text, View } from 'react-native';
>>>>>>> e9dae8d034fee314ed7b0055ffeb4f02449e6c2b
import logo from './assets/logo.png';
import GamesPage from './client/components/GamesPage';
import CluePage from './client/components/CluePage';
import NavBar from './client/components/NavBar';
import HomePage from './client/components/HomePage';
import Gps from './client/components/Gps';
import CameraComponent from './client/components/Camera';
import { Provider } from 'react-redux';
import store from './client/store';
import Navigator from './routes/tab';

export default function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
<<<<<<< HEAD
        <HomePage />
        {/* <Gps />
	      <NavBar /> */}
        {/* <Navigator /> */}
        {/* <CluePage /> */}
=======
	<Navigator />
>>>>>>> e9dae8d034fee314ed7b0055ffeb4f02449e6c2b
      </Provider>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 305,
    height: 305,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: 'black',
    fontSize: 36,
    fontWeight: 'bold',
  },
});
