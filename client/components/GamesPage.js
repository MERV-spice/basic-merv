import React from 'react';
import { Picker, StyleSheet, Text, View, FlatList } from 'react-native';
import { ListItem, Overlay, Button } from 'react-native-elements';
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

const GamesPage = () => {
    const [gameLookedAt, setGameLookedAt] = React.useState('');
    
    return (
	<View style={styles.container}>
	    <Text style={styles.currGamesTitle}>Current Games</Text>
	    {currGames.map(game =>
		<React.Fragment key={game.id}>
		    <Overlay
			isVisible={game.id === gameLookedAt}
			onBackdropPress={() => setGameLookedAt(-1)}
			height={200}
			overlayStyle={styles.overlayContainer}
		    >
			<React.Fragment>
			    <React.Fragment>
				<Text style={styles.currGamesTitle}>{game.name}</Text>
				<Text style={styles.gameInfo}>Players: {game.points}</Text>
			    </React.Fragment>
			    <Button
				title='Join Game'
				raised={true}
				containerStyle={styles.joinGameButton}
			    />
			</React.Fragment>
		    </Overlay>
	    
		    <ListItem
			key={game.id}
			titleStyle={styles.currGamesTitle}
			title={game.name}
			subtitle={game.timeLeft}
			onPress={() => setGameLookedAt(game.id)}
			chevron
			bottomDivider
		    />
		</React.Fragment>
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
    overlayContainer: {
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	justifyContent: 'center',
    },
    gameInfo: {
	fontSize: 20,	
    },
    joinGameButton: {
	display: 'flex',
	marginTop: 'auto',
	backgroundColor: 'red',
    }
});

export default GamesPage;
