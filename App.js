import React from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png';
import GamesPage from './client/components/GamesPage';
import CluePage from './client/components/CluePage';

export default function App() {
	return (<CluePage />)
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

