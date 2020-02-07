import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchScores} from '../store/scores';
let time;

class GameOver extends Component {
  async componentDidMount() {
    await this.props.fetchScores(2);
  }

  renderScores() {
    return this.props.scores.map((item, index) => (
      <Text key={index}>
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
      scoreObj => scoreObj.userId === /*this.props.user.id*/ 1
    );
    return (
      <View style={styles.container}>
        <Text>Good Job {this.props.user.username}!!!</Text>
        <Text>Leaderboard:</Text>
        {this.renderScores()}
        <Text>Your Score: {userScore ? userScore.score : null}</Text>
        <Text>
          Number of Items Found: {userScore ? userScore.itemsFound : null}
        </Text>
        <Text>Time elapsed: {time}</Text>
        <Button
          title="Play Again?"
          style={styles.input}
          onPress={() => this.props.navigation.navigate('GamesPage')}
        />
      </View>
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
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10
  }
});
