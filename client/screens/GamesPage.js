import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import {ListItem, Overlay} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchGames} from '../store/games';
import {joinGame} from '../store/user';
import parchment from '../../assets/parchment.jpg';
import * as Font from 'expo-font';

const {width: WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50
  },
  logo: {
    width: 75,
    height: 75
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
    backgroundColor: '#ebdda0',
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
  },
  btnLogout: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
  }
});

const GamesPage = ({setGames, games, enterGame, userId, navigation}) => {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [gameLookedAt, setGameLookedAt] = React.useState('');
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [gameMade, setGameMade] = React.useState(false);

  React.useEffect(() => {
    Font.loadAsync({
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
    }).then(setFontLoaded(true));
    setGames();
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
    navigation.navigate('Login');
  };

  const joinGamePressHandler = (gameId, uId) => {
    setGameMade(false);
    enterGame(gameId, uId);
    navigation.navigate('CluePage');
    setGameLookedAt(-1);
  };

  const datePrettifier = dateStr => {
    if (typeof dateStr === 'string') {
      let year = dateStr.slice(0, 4);
      let month = dateStr.slice(5, 7);
      let day = dateStr.slice(8, 10);
      let time = dateStr.slice(11, 19);
      return (
        <Text>
          {time} on {month}/{day}/{year}
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <ImageBackground source={parchment} style={styles.container}>
      {fontLoaded ? (
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.btnLogout} onPress={() => logOut()}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
          <Text style={styles.currGamesTitle}>Current Games</Text>
          <Image
            source={require('../../assets/redx.png')}
            style={styles.logo}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={games}
            onRefresh={async () => {
              setRefreshing(true);
              await setGames();
              setRefreshing(false);
            }}
            refreshing={isRefreshing}
            renderItem={game => {
              game = game.item;
              return (
                <React.Fragment key={game.id}>
                  <Overlay
                    isVisible={game.id === gameLookedAt}
                    onBackdropPress={() => setGameLookedAt(-1)}
                    height={300}
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
                        {game.startTime ? (
                          <Text style={styles.text}>
                            Start:{' '}
                            <Text>
                              {datePrettifier(
                                game.startTime.toLocaleString()
                              ).props.children.join('')}
                            </Text>
                          </Text>
                        ) : null}
                        {game.endTime ? (
                          <Text style={styles.text}>
                            End:{' '}
                            <Text>
                              {datePrettifier(
                                game.endTime.toLocaleString()
                              ).props.children.join('')}
                            </Text>
                          </Text>
                        ) : null}
                      </React.Fragment>
                      <TouchableOpacity
                        style={styles.btnJoinGame}
                        onPress={() => joinGamePressHandler(game.id, userId)}
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
            onPress={() => navigation.navigate('MakeGame', {setGameMade})}
          >
            <Text style={styles.text}>Create A Game</Text>
          </TouchableOpacity>
          <React.Fragment key={420}>
            <Overlay
              isVisible={gameMade === true}
              onBackdropPress={() => setGameMade(false)}
              height={300}
              overlayBackgroundColor="#ebdda0"
            >
              <Text style={styles.currGamesListText}>
                Your Game: {games[games.length - 1].name} has been created!
              </Text>
              <React.Fragment>
                <TouchableOpacity
                  style={styles.btnJoinGame}
                  onPress={() =>
                    joinGamePressHandler(games[games.length - 1].id, userId)
                  }
                >
                  <Text style={styles.text}>Join Game</Text>
                </TouchableOpacity>
              </React.Fragment>
            </Overlay>
          </React.Fragment>
        </View>
      ) : null}
    </ImageBackground>
  );
};

const mapState = state => ({
  games: state.games,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  enterGame: (gameId, userId) => dispatch(joinGame(gameId, userId)),
  setGames: () => dispatch(fetchGames())
});

export default connect(mapState, mapDispatch)(GamesPage);
