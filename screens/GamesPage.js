import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ListItem, Overlay, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchGames } from '../client/store/games';

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

const GamesPage = ({setGames, games}) => {
    React.useEffect(() => {
	const setter = async () => {
	    await setGames();
	}
	setter();
    }, []);

    const [gameLookedAt, setGameLookedAt] = React.useState('');
    return (
	<View style={styles.container}>
	    <Text style={styles.currGamesTitle}>Current Games</Text>
	    <FlatList
		data={games}
		renderItem={game => {
		    game = game.item;
		    return (
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
					<Text style={styles.gameInfo}>Players: {game.users.length}</Text>
					<Text style={styles.gameInfo}>Clues: {game.clues.length}</Text>
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
			    onPress={() => setGameLookedAt(game.id)}
			    containerStyle={styles.listItemContainer}
			    />
			</React.Fragment>
		    )}}
		keyExtractor={item => item.id}
		listEmptyComponent={<Text>No current games</Text>}
		extraData={games}
	    />
	</View>
    );
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: '#fff',
	justifyContent: 'center',
	alignItems: 'center',
    },
    currGamesTitle: {
	color: 'black',
	fontSize: 25,
	fontWeight: 'bold',
	textAlign: 'center',
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
    },
    listItemContainer: {
	height: 80,//45,
	width: 250,
	borderRadius: 4,
	borderWidth: .5,
	borderColor: 'black',
	marginBottom: 2,
	backgroundColor: 'lightgray',
    },
    flatList: {
	backgroundColor: 'pink',
    }
});

const mapState = state => ({
    games: state.games,
});

const mapDispatch = dispatch => ({
    setGames: () => dispatch(fetchGames()),
});

export default connect(mapState, mapDispatch)(GamesPage);

