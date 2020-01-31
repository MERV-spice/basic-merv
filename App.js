import React from 'react'
import {Navigator, Image, StyleSheet, Text, View} from 'react-native'
import logo from './assets/logo.png'
import GamesPage from './client/components/GamesPage'
import CluePage from './client/components/CluePage'
import NavBar from './client/components/NavBar'
import HomePage from './client/components/HomePage';
import Gps from './client/components/Gps';
import CameraComponent from'./client/components/Camera'; 

export default function App() {
    return (
	<React.Fragment>
	    <HomePage />
	</React.Fragment>
    )
}

const styles = StyleSheet.create({
  logo: {
    width: 305,
    height: 305
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textColor: {
    color: 'black',
    fontSize: 36,
    fontWeight: 'bold'
  }
})
