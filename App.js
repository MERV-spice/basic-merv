import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import logo from './assets/logo.png'
import GamesPage from './client/components/GamesPage'
import CluePage from './client/components/CluePage'
import NavBar from './client/components/NavBar'
import Gps from './client/components/Gps';
import CameraComponent from './client/components/Camera'; 
import Navigator from './routes/homeStack'


export default function App() {
    return (
	<React.Fragment>
	    {/* <Gps />
	    <NavBar /> */}
		<Navigator />
	    {/* <CluePage />
	    <NavBar /> */}
	</React.Fragment>
    )
  // return (<GamesPage />)
  // return (
  // <View style={styles.container}>
  //     <Image source={logo} style={styles.logo} />
  //     <Text style={styles.textColor}>Wheres MERV?</Text>
  // </View>
  // );
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
