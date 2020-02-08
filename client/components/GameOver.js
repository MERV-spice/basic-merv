import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {fetchScores} from '../store/scores';
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
    await this.props.fetchScores(this.props.user.id);
    console.log('COMPONENT DID MOUNT', this.props.user.id);
  }

  renderScores() {
    return this.props.scores.map((item, index) => (
      <Text key={index} style={styles.text}>
        {item.user.username}: {item.score}
      </Text>
    ));
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
      let ms = new Date() - new Date(this.props.scores[0].game.playerEndTime);
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
            <Text style={styles.text}>Leaderboard:</Text>
            {this.renderScores()}
            <Text style={styles.text}>
              Your Score: {userScore ? userScore.score : null}
            </Text>
            <Text style={styles.text}>
              Number of Items Found: {userScore ? userScore.itemsFound : null}
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
    scores: state.scores,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    fetchScores: gameId => dispatch(fetchScores(gameId))
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
  logo: {
    width: 75,
    height: 75,
    marginBottom: 40
  }
});
