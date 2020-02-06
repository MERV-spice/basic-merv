import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import {ListItem, Overlay, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchGames} from '../store/games';
import {joinGame} from '../store/user';
import {Actions} from 'react-native-router-flux';
import parchment from '../../assets/parchment.jpg';

const {width: WIDTH} = Dimensions.get('window');

const GamesPage = ({setGames, games, joinGame, userId}) => {
  React.useEffect(() => {
    const setter = async () => {
      await setGames();
    };
    setter();
  }, []);

  const [gameLookedAt, setGameLookedAt] = React.useState('');

  return (
    <ImageBackground source={parchment} style={styles.container}>
      <TouchableOpacity
        style={styles.btnMakeGame}
        onPress={() => Actions.makeGame()}
      >
        <Text style={styles.text}>Make Game</Text>
      </TouchableOpacity>
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
                    <Text style={styles.gameInfo}>
                      Players: {game.users.length}
                    </Text>
                    <Text style={styles.gameInfo}>
                      Clues: {game.clues.length}
                    </Text>
                  </React.Fragment>
                  <Button
                    title="Join Game"
                    raised={true}
                    containerStyle={styles.joinGameButton}
                    onPress={() => joinGame(game.id, userId)}
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
          );
        }}
        keyExtractor={item => item.id.toString()}
        listEmptyComponent={<Text>No current games</Text>}
        extraData={games}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  currGamesTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  overlayContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  gameInfo: {
    fontSize: 20
  },
  joinGameButton: {
    display: 'flex',
    marginTop: 'auto',
    backgroundColor: 'red'
  },
  listItemContainer: {
    height: 80, //45,
    width: 250,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: 2,
    backgroundColor: 'lightgray'
  },
  flatList: {
    backgroundColor: 'pink'
  },
  btnMakeGame: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    color: '#DBF9F4',
    fontSize: 16,
    textAlign: 'center'
  }
});

const mapState = state => ({
  games: state.games,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  setGames: () => dispatch(fetchGames()),
  joinGame: (gameId, userId) => dispatch(joinGame(gameId, userId))
});

export default connect(mapState, mapDispatch)(GamesPage);
