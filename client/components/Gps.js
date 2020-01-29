import React from 'react';
import { Platform, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Gps() {
    const [location, setLocation] = React.useState('');

    const findCoordinates = () => {
	navigator.geolocation.getCurrentPosition(
	    async position => {
		const location = JSON.stringify(position);
		setLocation(location);
		try {
		    await axios.get('https://a48a1b9f.ngrok.io/api/users/test');
		} catch(err) {
		    console.error(err);
		}
	    },
	    error => Alert.alert(error.message),
	);
    };

    return (
	<View style={styles.container}>
	    <TouchableOpacity onPress={findCoordinates}>
		<Text>Location: {location}</Text>
	    </TouchableOpacity>
	</View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

