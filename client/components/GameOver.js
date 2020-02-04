import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class GameOver extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Good Job null!!!</Text>
        <Text>Leaderboard:</Text>
        <Text>1...</Text>
        <Text>2...</Text>
        <Text>3...</Text>
        <Text>Time elapsed: null</Text>
        <Text>Number of Items Found: null</Text>
        <Button title="Play Again?" style={styles.input} />
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

export default connect(null)(GameOver);

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
