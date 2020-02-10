import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import {fetchScores} from '../store/scores';
import {fetchGameUserScore} from '../store/gameUserScore';
import parchment from '../../assets/parchment.jpg';
import * as Font from 'expo-font';
import {TouchableOpacity} from 'react-native-gesture-handler';

let time;
const {width: WIDTH} = Dimensions.get('window');

class GameOver extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
    });
    this.setState({fontLoaded: true});
    await this.props.fetchScores(this.props.user.game.id);
    // console.log('COMPONENT DID MOUNT', 'USERGAME', this.props.user.game.id);
    await this.props.fetchGameUserScore(
      this.props.user.id,
      this.props.user.game.id
    );
  }

  render() {
    function dhm(t) {
      let cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000),
        pad = function(n) {
          return n < 10 ? '0' + n : n;
        };
      if (m === 60) {
        h++;
        m = 0;
      }
      if (h === 24) {
        d++;
        h = 0;
      }
      return `${d} days, ${pad(h)} hours, ${pad(m)} minutes`;
    }

    if (this.props.scores.length) {
      let ms = new Date() - new Date(this.props.scores[0].game.endTime);
      time = dhm(ms);
    }
    const [userScore] = this.props.scores.filter(
      scoreObj => scoreObj.userId === this.props.user.id
    );
    return (
      <ImageBackground source={parchment} style={styles.container}>
        {this.state.fontLoaded ? (
          <View style={styles.container}>
            <Image
              source={require('../../assets/redx.png')}
              style={styles.logo}
            />
            <Text style={styles.headerText}>
              Good Job {this.props.user.username}!!!
            </Text>
            <Text style={styles.subHeaderText}>Leaderboard:</Text>
            <FlatList
              keyExtractor={item => String(item.id)}
              showsVerticalScrollIndicator={false}
              data={this.props.scores}
              renderItem={({item}) => (
                <View style={styles.listItemContainer}>
                  <Text style={styles.text}>
                    {item.user.username}: {item.score}
                  </Text>
                </View>
              )}
            />
            <Text style={styles.subHeaderText}>
              Your Score: {userScore ? userScore.score : null}
            </Text>
            <Text style={styles.text}>
              Number of Items Found: {userScore ? userScore.itemsFound : 0}
            </Text>
            <Text style={styles.text}>Time elapsed: {time}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.input}
                onPress={() => this.props.navigation.navigate('GamesPage')}
              >
                <Text style={styles.text}>play again?</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    );
  }
}

const mapState = state => {
  return {
    gameUserScore: state.gameUserScore,
    scores: state.scores,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    fetchScores: gameId => dispatch(fetchScores(gameId)),
    fetchGameUserScore: (userId, gameId) =>
      dispatch(fetchGameUserScore(userId, gameId))
  };
};

export default connect(mapState, mapDispatch)(GameOver);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainer: {
    marginTop: 40
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginBottom: 30
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
  headerText: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subHeaderText: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  logo: {
    width: 75,
    height: 75,
    marginTop: 40,
    marginBottom: 40
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
  }
});
