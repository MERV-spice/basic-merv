import React from 'react';
import {
  StyleSheet,
  Text,
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
import * as Font from 'expo-font';

const {width: WIDTH} = Dimensions.get('window');

const GamesPage = ({setGames, games, joinGame, userId}) => {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [gameLookedAt, setGameLookedAt] = React.useState('');

  React.useEffect(() => {
    Font.loadAsync({
      'VastShadow-Regular': require('../../assets/fonts/VastShadow-Regular.ttf')
    }).then(setFontLoaded(true));
  });

  React.useEffect(() => {
    const setter = async () => {
      await setGames();
    };
    setter();
  }, []);

  return (
    <ImageBackground source={parchment} style={styles.container}>
      {fontLoaded ? (
        <Text style={styles.currGamesTitle}>Current Games</Text>
      ) : null}
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
      <TouchableOpacity
        style={styles.btnMakeGame}
        onPress={() => Actions.makeGame()}
      >
        <Text style={styles.text}>Make Game</Text>
      </TouchableOpacity>
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
    fontFamily: 'VastShadow-Regular',
    fontSize: 35,
    color: 'black',
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.9,
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
    width: WIDTH - 55,
    height: 80,
    borderRadius: 25,
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
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
