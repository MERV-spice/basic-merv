import React, {Component} from 'react';
import {
  Image,
  TextInput,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {auth} from '../store';
import * as Font from 'expo-font';
import parchment from '../../assets/parchment.jpg';

const {width: WIDTH} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
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
  btnLogin: {
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

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      showPass: true,
      press: false,
      email: 'user0@email.com',
      password: '123'
    };
    this.onLogin = this.onLogin.bind(this);
  }

  static navigationOptions = {headerShown: false};

  async getEmail() {
    try {
      const email = await AsyncStorage.getItem('email');
      if (email !== null) {
        return email;
      }
    } catch {
      console.log('no email in async storage');
    }
  }

  async getPassword() {
    try {
      const password = await AsyncStorage.getItem('password');
      if (password !== null) {
        return password;
      }
    } catch {
      console.log('no password in async storage');
    }
  }
  async onLogin(email, password) {
    await this.props.auth(email, password);
    if (this.props.user.id) {
      this.props.navigation.navigate('GamesPage');
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
    });
    const email = await this.getEmail();
    const password = await this.getPassword();
    this.onLogin(email, password);
    this.setState({fontLoaded: true});
  }

  showPass = () => {
    if (this.state.press === false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };

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
                <Text style={styles.text}>
                  A mobile tresure hunting adventure...
                </Text>
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
                style={styles.btnLogin}
                onPress={() =>
                  this.onLogin(this.state.email, this.state.password)
                }
              >
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => this.props.navigation.navigate('SignUp')}
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
    auth: (email, password) => dispatch(auth(email, password))
  };
};
export default connect(mapState, mapDispatch)(AuthForm);
