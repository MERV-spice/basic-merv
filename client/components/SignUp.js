import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import {signUpUser} from '../store/user';
import * as Font from 'expo-font';
import parchment from '../../assets/parchment.jpg';
import {Ionicons} from '@expo/vector-icons';

const {width: WIDTH} = Dimensions.get('window');

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      fontLoaded: false,
      showPass: true
    };
  }
  static navigationOptions = {headerShown: false};

  async componentDidMount() {
    await Font.loadAsync({
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
    });
    this.setState({fontLoaded: true});
  }
  showPass = () => {
    if (this.state.press === false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };

  onSignUp() {
    const {username, email, password} = this.state;
    this.props.signUpUser(this.state);
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ImageBackground source={parchment} style={styles.container}>
          {this.state.fontLoaded ? (
            <View>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/redx.png')}
                  style={styles.logo}
                />
                <Text style={styles.logoText}>Ahoy!!!</Text>
              </View>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="md-person"
                  size={28}
                  color="#0A122A"
                  style={styles.inputIcon}
                />
                <TextInput
                  value={this.state.username}
                  onChangeText={username => this.setState({username})}
                  placeholder="Username"
                  style={styles.input}
                />
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
                    name={this.state.press === false ? 'md-eye' : 'md-eye-off'}
                    size={26}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btnSignUp}
                onPress={this.onSignUp.bind(this)}
              >
                <Text style={styles.text}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ImageBackground>
      </KeyboardAvoidingView>
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
    signUpUser: user => dispatch(signUpUser(user))
  };
};

export default connect(mapState, mapDispatch)(SignUp);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
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
    fontFamily: 'Kranky-Regular',
    fontSize: 50,
    color: 'black',
    fontWeight: '500',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
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
  btnSignUp: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 14
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
