import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {currentClueReset} from '../store/user';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.pressHandler = this.pressHandler.bind(this);
  }
  //if you press new game, thunks the clue reset to reset your clueCount to zero and takes you to the GamePage
  pressHandler() {
    this.props.currentClueReset(this.props.user);
    this.props.navigation.navigate('GamesPage');
  }
  render() {
    const user = this.props.user;
    console.log('in game over render ', this.props.user.id);
    return (
      <View style={styles.container}>
        <Text>Good Job: {user.email}!!!</Text>
        <Text>Leaderboard:</Text>
        <Text>1...</Text>
        {/*props.user.game.highestscore.idk.how.this.will.work*/}
        <Text>2...</Text>
        <Text>3...</Text>
        <Text>Time elapsed: null</Text>
        <Text>Number of Items Found: {user.currentClue}</Text>
        <Button
          title="New Game??"
          style={styles.input}
          onPress={this.pressHandler}
        />
      </View>
    );
  }
}

// const mapState = state => {
//   return {
//     user: state.user,
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     signUpUser: user => dispatch(signUpUser(user)),
//   };
// };

const mapState = state => ({
  user: state.user
});

const mapDispatch = {
  currentClueReset
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
