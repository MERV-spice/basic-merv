import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchScores} from '../store/scores';

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
        <Button title="Play Again?" style={styles.input} />
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
