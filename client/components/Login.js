import React, {Component} from 'react';
import {
  Image,
  TextInput,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {auth} from '../store';
import paper from '../../assets/paper.jpg';

const {width: WIDTH} = Dimensions.get('window');

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPass: true,
      press: false,
      email: 'user0@email.com',
      password: '123'
    };
  }

  showPass = () => {
    if (this.state.press === false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };

  onLogin() {
    const {email, password} = this.state;
    this.props.auth(email, password);
  }
  render() {
    return (
      <ImageBackground source={paper} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Merv Life</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="md-at"
            size={28}
            color="#0A122A"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder="Email"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="ios-lock"
            size={28}
            color="#0A122A"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder="Password"
            secureTextEntry={this.state.showPass}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}
          >
            <Ionicons
              name={this.state.press == false ? 'md-eye' : 'md-eye-off'}
              size={26}
            />
          </TouchableOpacity>

          {/* <Button title="Log In" onPress={this.onLogin.bind(this)} /> */}
        </View>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={this.onLogin.bind(this)}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
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
export default (Login = connect(mapState, mapDispatch)(AuthForm));

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 120
  },
  logoText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    paddingLeft: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgba(219,249,244,0.35)',
    fontSize: 16
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 14
  },
  inputContainer: {
    marginTop: 10
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#191516',
    justifyContent: 'center',
    marginTop: 20,
    color: '#DBF9F4'
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 14
  },
  text: {
    color: '#DBF9F4',
    fontSize: 16,
    textAlign: 'center'
  }
});
