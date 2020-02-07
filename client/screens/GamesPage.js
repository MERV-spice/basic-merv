import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  View,
  Image
} from 'react-native';
import {ListItem, Overlay} from 'react-native-elements';
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
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
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
        <View style={styles.logoContainer}>
          <Text style={styles.currGamesTitle}>Current Games</Text>
          <Image
            source={require('../../assets/redx.png')}
            style={styles.logo}
          />
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
                    overlayBackgroundColor="#ebdda0"
                  >
                    <React.Fragment>
                      <React.Fragment>
                        <Text style={styles.currGamesListText}>
                          {game.name}
                        </Text>
                        <Text style={styles.text}>
                          Players: {game.users.length}
                        </Text>
                        <Text style={styles.text}>
                          Clues: {game.clues.length}
                        </Text>
                      </React.Fragment>
                      <TouchableOpacity
                        style={styles.btnJoinGame}
                        onPress={() => joinGame(game.id, userId)}
                      >
                        <Text style={styles.text}>Join Game</Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  </Overlay>

                  <ListItem
                    key={game.id}
                    titleStyle={styles.currGamesListText}
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
            <Text style={styles.text}>Create A Game</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 120
  },
  currGamesTitle: {
    fontFamily: 'Kranky-Regular',
    fontSize: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: 'black',
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.9,
    textAlign: 'center'
  },
  currGamesListText: {
    fontFamily: 'Kranky-Regular',
    fontSize: 35,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: 'black',
    fontWeight: '500',
    opacity: 0.9,
    textAlign: 'center'
  },
  gameInfo: {
    fontSize: 20
  },
  joinGameButton: {
    display: 'flex',
    marginTop: 'auto',
    backgroundColor: 'black'
  },
  listItemContainer: {
    width: WIDTH - 55,
    height: 80,
    borderWidth: 1,
    borderColor: 'black',
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
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
  },
  btnJoinGame: {
    width: WIDTH - 100,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
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
