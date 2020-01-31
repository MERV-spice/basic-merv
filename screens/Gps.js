// import React from 'react';
import { /*Platform, StyleSheet, Text, View, */Alert/*, TouchableOpacity*/ } from 'react-native';
// import axios from 'axios';
// import ngrokUrl from '../ngrok'

// export default function Gps() {
//     const [location, setLocation] = React.useState('');

    const findCoordinates = fn => {
		navigator.geolocation.getCurrentPosition(
			/*async*/ position => {
			// const location = JSON.stringify(position);
			// setLocation(location);
				// try {
					// await axios.post(`https://${ngrokUrl}.ngrok.io/api/users/test`, position);
				// } catch(err) {
				// 	console.error(err);
				// }
				fn(position);
			},
			error => Alert.alert(error.message),
		);
	};
	
	export default findCoordinates

//     return (
// 	<View style={styles.container}>
// 	    <TouchableOpacity onPress={findCoordinates}>
// 		<Text>Location: {location}</Text>
// 	    </TouchableOpacity>
// 	</View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

