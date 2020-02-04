import React, {Component} from 'react';
import {Alert, Button, TextInput, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {auth} from '../store';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onLogin() {
    const {email, password} = this.state;
    this.props.auth(email, password);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title="Log In"
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    auth: (email, password) => dispatch(auth(email, password))
  };
};
export default Login = connect(
  mapState,
  mapDispatch
)(AuthForm);

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
