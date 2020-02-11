/* eslint-disable complexity */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {addGameThunk} from '../store/games';
import {fetchClues} from '../store/clues';
import {connect} from 'react-redux';
import {Overlay} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Appearance} from 'react-native-appearance';
import parchment from '../../assets/parchment.jpg';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';

const {width: WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    paddingLeft: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgba(219,249,244,0.35)',
    fontSize: 16,
    marginBottom: 20
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 14
  },
  newGameHeader: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 40
  },
  newGameSubHeader: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 30
  },
  newGameText: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 25
  },
  timeBtn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#ebdda0',
    justifyContent: 'center',
    marginTop: 8
  },
  btn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#ebdda0',
    justifyContent: 'center',
    marginBottom: 30
  },
  removeBtn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#7A8B8B',
    justifyContent: 'flex-start',
    marginBottom: 30
  },
  createBtn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginBottom: 30
  },
  overlayBtn: {
    width: WIDTH - 240,
    height: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
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
  overlayItem: {
    backgroundColor: '#ebdda0',
    borderWidth: 1,
    borderColor: 'black'
  },
  logo: {
    width: 75,
    height: 75
  },
  inputContainer: {
    marginTop: 10
  },
  timeContainer: {
    marginTop: 8
  },
  addClueBtnContainer: {
    alignItems: 'center',
    paddingBottom: 5
  },
  imgContainer: {
    alignItems: 'center',
    paddingTop: 5
  },
  newImgContainer: {
    alignItems: 'center',
    marginBottom: 20
  }
});

class MakeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      gameName: '',
      gameClues: [],
      clueNum: 1,
      clueImg: {},
      clueText: '',
      clueHint: '',
      createClue: null,
      private: false,
      keyCode: null,
      showOverlay: false,
      isDatePickerVisible: false,
      isDarkModeEnabled: false,
      start: '',
      end: '',
      fontLoaded: false,
      startDB: null,
      endDB: null,
      showStartError: false,
      showEndError: false
    };
    this.addDBClue = this.addDBClue.bind(this);
    this.setPrivacy = this.setPrivacy.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.pickingStart = true;
    this.removeClue = this.removeClue.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
    });
    this.setState({fontLoaded: true});
    this.setState({userId: this.props.user});
    this.props.fetchClues();

    //enabling date/time picker for dark mode on ios
    let colorScheme = Appearance.getColorScheme();
    let isDarkModeEnabled = colorScheme === 'dark';
    this.setState({isDarkModeEnabled});
  }

  addClue() {
    const clueImg = {...this.state.clueImg};
    const {clueNum, clueText, clueHint} = this.state;
    const clue = {
      clueNum,
      clueImgId: clueImg.id,
      clueText,
      clueAccessPic: clueImg.accessPic,
      clueHint
    };

    const newGameClues = [clue];
    this.state.gameClues.forEach(el => {
      newGameClues.push({...el});
    });
    this.setState({
      gameClues: newGameClues,
      clueNum: clue.clueNum + 1,
      clueImg: {},
      clueText: '',
      createClue: false,
      clueHint: ''
    });
  }

  removeClue(id) {
    const gameClues = [];
    this.state.gameClues.forEach(el => {
      if (el.clueNum !== id) gameClues.push({...el});
    });
    this.setState({gameClues});
  }

  addDBClue(clue) {
    const clueNum = this.state.clueNum;
    const newClue = {
      clueNum,
      clueImgId: clue.pictures[0].id,
      clueText: clue.text,
      clueAccessPic: clue.pictures[0].accessPic,
      clueHint: clue.hint
    };

    const newGameClues = [newClue];
    this.state.gameClues.forEach(el => {
      newGameClues.push({...el});
    });

    this.setState({
      gameClues: newGameClues,
      clueNum: newClue.clueNum + 1,
      showOverlay: false
    });
  }

  addGame() {
    let newGame = {
      name: this.state.gameName,
      clues: this.state.gameClues,
      makerId: this.state.userId,
      startTime: this.state.startDB,
      endTime: this.state.endDB,
      passcode: this.state.keyCode
    };
    this.props.navigation.navigate('GamesPage');
    this.props.navigation.state.params.setGameMade(true);
    this.props.addGameThunk(newGame);
  }

  setPrivacy(value) {
    this.setState({private: value});

    //make passcode
    var passcode = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      passcode += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    //add passcode
    if (value && !this.state.keyCode) {
      this.setState({keyCode: passcode});
    }
  }

  //confirming start and end dates
  handleConfirm(date) {
    let newDate = new Date();
    if (this.pickingStart) {
      if ((date - newDate) / 1000 > -200) {
        this.setState({
          startDB: date,
          start: date.toLocaleString(),
          showStartError: false
        });
      } else {
        this.setState({showStartError: true});
      }
    } else if ((date - this.state.startDB) / 1000 > -200) {
      this.setState({
        endDB: date,
        end: date.toLocaleString(),
        showEndError: false
      });
    } else {
      this.setState({showEndError: true});
    }
    this.setState({
      isDatePickerVisible: false
    });
  }

  goToCamera() {
    this.props.navigation.navigate('MakeClueCamera', {
      fn: img => this.setState({clueImg: img})
    });
  }

  // eslint-disable-next-line complexity
  render() {
    if (!this.props.clues) return <Text>Loading...</Text>;
    return (
      <ImageBackground source={parchment} style={styles.container}>
        {this.state.fontLoaded ? (
          <React.Fragment>
            <Overlay
              isVisible={this.state.showOverlay}
              onBackdropPress={() => this.setState({showOverlay: false})}
            >
              <FlatList
                data={this.props.clues}
                renderItem={({item}) => {
                  return (
                    <View style={styles.overlayItem}>
                      <Text style={styles.text}>{item.text}</Text>
                      <View style={styles.imgContainer}>
                        <Image
                          source={{uri: item.pictures[0].accessPic}}
                          style={{
                            width: 80,
                            height: 80,
                            borderColor: 'black',
                            borderWidth: 1
                          }}
                        />
                      </View>
                      <View style={styles.addClueBtnContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            this.addDBClue(item);
                            this.setState({clueText: item.text});
                            this.setState({
                              clueImg: item.pictures[0].accessPic
                            });
                          }}
                          style={styles.overlayBtn}
                        >
                          <Text style={styles.text}>add clue</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={item => item.id.toString()}
              />
            </Overlay>
            <ScrollView>
              <View style={styles.headerContainer}>
                <Text style={styles.newGameHeader}>Create A New Game!</Text>
                <Image
                  source={require('../../assets/redx.png')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="ios-create"
                  size={28}
                  color="#0A122A"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={this.state.gameName}
                  onChangeText={gameName => this.setState({gameName})}
                  placeholder="Game Name"
                  underlineColorAndroid="transparent"
                />
              </View>
              <React.Fragment>
                <TouchableOpacity
                  style={styles.timeBtn}
                  onPress={() => {
                    this.setState({isDatePickerVisible: true});
                    this.pickingStart = true;
                  }}
                >
                  <Text style={styles.text}>pick a start time</Text>
                </TouchableOpacity>
                {this.state.showStartError ? (
                  <Text
                    style={{...styles.text, color: 'red', fontWeight: 'bold'}}
                  >
                    Please pick a future date.{' '}
                  </Text>
                ) : (
                  <View style={styles.timeContainer}>
                    <Text style={styles.text}>{this.state.start}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.timeBtn}
                  onPress={() => {
                    this.setState({isDatePickerVisible: true});
                    this.pickingStart = false;
                  }}
                >
                  <Text style={styles.text}>pick an end time</Text>
                </TouchableOpacity>
                {this.state.showEndError ? (
                  <Text
                    style={{...styles.text, color: 'red', fontWeight: 'bold'}}
                  >
                    Please pick an end date after start.{' '}
                  </Text>
                ) : (
                  <View style={styles.timeContainer}>
                    <Text style={styles.text}>{this.state.end}</Text>
                  </View>
                )}
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="datetime"
                  onConfirm={this.handleConfirm}
                  isDarkModeEnabled={this.state.isDarkModeEnabled}
                  onCancel={() =>
                    this.setState({
                      isDatePickerVisible: false
                    })
                  }
                />
              </React.Fragment>

              <Text style={styles.newGameSubHeader}>Clues: </Text>
              {/* preexisting clues for this game */}
              {this.state.gameClues.length > 0 ? (
                <FlatList
                  keyExtractor={item => item.clueNum.toString()}
                  data={this.state.gameClues}
                  renderItem={clue => {
                    clue = clue.item;
                    return (
                      <React.Fragment key={clue.clueNum}>
                        <Text style={styles.newGameSubHeader}>
                          Clue {clue.clueNum}:
                        </Text>
                        <Text style={styles.newGameText}>Image: </Text>
                        <View style={styles.imgContainer}>
                          <Image
                            style={{
                              width: 200,
                              height: 200,
                              borderColor: 'black',
                              borderWidth: 1
                            }}
                            source={{uri: clue.clueAccessPic}}
                          />
                        </View>
                        <Text style={styles.newGameText}>
                          Clue Text: {clue.clueText}
                        </Text>
                        <Text style={styles.newGameText}>
                          Clue Hint: {clue.clueHint}
                        </Text>
                        <TouchableOpacity
                          style={styles.removeBtn}
                          onPress={() => this.removeClue(clue.clueNum)}
                        >
                          <Text style={styles.text}>remove Clue</Text>
                        </TouchableOpacity>
                      </React.Fragment>
                    );
                  }}
                />
              ) : (
                <React.Fragment>
                  <Text style={styles.newGameText}>
                    No clues so far... try adding one!
                  </Text>
                </React.Fragment>
              )}
              <React.Fragment>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    this.setState({createClue: false, showOverlay: true})
                  }
                >
                  <Text style={styles.text}>pick a clue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.setState({createClue: true})}
                >
                  <Text style={styles.text}>create a clue</Text>
                </TouchableOpacity>
                {this.state.createClue === null ? (
                  <React.Fragment />
                ) : this.state.createClue === true ? (
                  // if you are creating a clue from scratch
                  <React.Fragment>
                    <Text style={styles.newGameSubHeader}>
                      Clue {this.state.clueNum}:{' '}
                    </Text>
                    <Text style={styles.newGameText}>Clue Text: </Text>
                    <TextInput
                      style={styles.input}
                      value={this.state.clueText}
                      onChangeText={clueText => this.setState({clueText})}
                    />
                    <Text style={styles.newGameText}>Clue Hint: </Text>
                    <TextInput
                      style={styles.input}
                      value={this.state.clueHint}
                      onChangeText={clueHint => this.setState({clueHint})}
                    />
                    {this.state.clueImg.accessPic ? (
                      <View style={styles.newImgContainer}>
                        <Image
                          style={{
                            width: 200,
                            height: 200,
                            borderColor: 'black',
                            borderWidth: 1
                          }}
                          source={{uri: this.state.clueImg.accessPic}}
                        />
                      </View>
                    ) : null}
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={this.goToCamera.bind(this)}
                    >
                      <Text style={styles.text}>take a picture</Text>
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={this.addClue.bind(this)}
                        disabled={!this.state.clueText || !this.state.clueImg}
                      >
                        <Text style={styles.text}>add clue</Text>
                      </TouchableOpacity>
                    </View>
                  </React.Fragment>
                ) : // // if you are using a clue from the database all changes on overlay
                null}
              </React.Fragment>
              <Text style={styles.newGameText}>This game will be: </Text>
              <RadioForm
                radio_props={[
                  {label: 'public', value: false},
                  {label: 'private', value: true}
                ]}
                initial={false}
                onPress={value => this.setPrivacy(value)}
                buttonColor="#E20014"
                labelStyle={{fontFamily: 'Kranky-Regular', fontSize: 20}}
              />
              {this.state.private ? (
                <Text>Passcode: {this.state.keyCode}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.createBtn}
                onPress={this.addGame.bind(this)}
                disabled={
                  !this.state.userId ||
                  !this.state.gameName ||
                  !this.state.gameClues.length ||
                  !this.state.startDB ||
                  !this.state.endDB
                }
              >
                <Text style={styles.text}>create game</Text>
              </TouchableOpacity>
            </ScrollView>
          </React.Fragment>
        ) : null}
      </ImageBackground>
    );
  }
}

const mapState = state => ({
  clues: state.clues,
  user: state.user
});

const mapDispatch = {
  addGameThunk,
  fetchClues
};

export default connect(mapState, mapDispatch)(MakeGame);
