import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
//import logo from './assets/logo.png';

const currGames = [
    {
	id: 1,
	name: 'Game 1',
	points: 200,
	timeLeft: '2 hours',
    },
    {
	id: 2,
	name: 'Game 2',
	points: 220,
	timeLeft: '3 hours',
    },
    {
	id: 3,
	name: 'Game 3',
	points: 20,
	timeLeft: '1 hour',
    },
];

export default function GamesPage({navigation}) {
	const pressHandler = () => {
		navigation.navigate('CluePage')
	}
    return (
			<View style={styles.container}>
			 <Button title="To Clues" onPress={pressHandler} />
	    <Text style={styles.currGamesTitle}>Current Games</Text>
	    {currGames.map(game =>
		<ListItem
		    key={game.id}
		    titleStyle={styles.currGamesTitle}
		    title={game.name}
		    subtitle={game.timeLeft}
		    chevron
		    bottomDivider
		/>
	    )}
	</View>
    );
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: '#fff',
	justifyContent: 'center',
    },
    currGamesTitle: {
	color: 'black',
	fontSize: 25,
	fontWeight: 'bold',
    },
});

