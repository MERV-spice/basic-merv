import React from 'react'
import {Navigator, Image, StyleSheet, Text, View} from 'react-native'
import logo from './assets/logo.png'
import GamesPage from './client/components/GamesPage'
import CluePage from './client/components/CluePage'
import NavBar from './client/components/NavBar'
import CameraComponent from'./client/components/Camera'; 

export default function App() {
    /* return (
       <Navigator
       initialRoute={{title: 'cool', index: 0}}
       renderScene={(route, navigator) => <Text> Hello </Text>}
       navigationBar={
       <Navigator.NavigationBar
       routeMapper={{
       LeftButton: (route, navigator, index, navState) => <Text>1</Text>,
       RightButton: (route, navigator, index, navState) => <Text>1</Text>,
       Title: (route, navigator, index, navState) => <Text>Nav</Text>,
       }}
       style={{backgroundColor: 'gray'}}
       />
       }
       
       />
     * );
     */
    return (
	<React.Fragment>
		<CameraComponent />
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
