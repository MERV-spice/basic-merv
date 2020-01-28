import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png';

export default function App() {
  return (
    <View style={styles.container}>
	<Image source={logo} style={styles.logo} />
	<Text style={styles.textColor}>Wheres MERV?</Text>
    </View>
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

