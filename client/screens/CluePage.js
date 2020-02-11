import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {currentCluePlus} from '../store/user';
import {getSingleGameThunk} from '../store/games';
import CountDown from 'react-native-countdown-component';
import parchment from '../../assets/parchment.jpg';
import * as Font from 'expo-font';
import {addScoreThunk, fetchGameUserScore} from '../store/gameUserScore';
import {Overlay} from 'react-native-elements';

const {width: WIDTH} = Dimensions.get('window');

// eslint-disable-next-line complexity
const CluePage = props => {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [score, setScore] = useState(-1);
  const [hint, setHint] = useState(0);

  React.useEffect(() => {
    Font.loadAsync({
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
    }).then(setFontLoaded(true));
    props.getSingleGameThunk(props.user.game.id);
    props.fetchGameUserScore(props.user.id, props.user.game.id);
  }, []);

  const clues = props.user.game.clues;
  const currentClue = props.user.currentClue;

  const [isSuccessOverlayVisible, makeSuccessOverlayVisible] = useState(false);
  const [isFailureOverlayVisible, makeFailureOverlayVisible] = useState(false);

  const pressHandler = () => {
    props.navigation.navigate('Camera', {
      setScore,
      id: clues[currentClue].pictures[0].id,
      location: clues[currentClue].pictures[0].location.coordinates
    });
  };

  const thenFun = () => {
    let coins = 10;
    if (hint) coins = 5;
    props.addScoreThunk(props.user.id, props.user.game.id, coins);
    setScore(-1);
    props.currentCluePlus(props.user);
    setHint(0);
  };

  if (score >= 0.7) {
    makeSuccessOverlayVisible(true);
    console.log('score', score);
    thenFun();
  } else if (score > 0 && score < 0.7) {
    makeFailureOverlayVisible(true);
    console.log('score', score);
    setScore(-1);
  }
  if (currentClue >= clues.length) {
    props.navigation.navigate('GameOver');
    return <Text>Join a new game!</Text>;
  }

  return (
    <ImageBackground source={parchment} style={styles.container}>
      <Overlay
        isVisible={isSuccessOverlayVisible}
        onBackdropPress={() => makeSuccessOverlayVisible(false)}
        height={200}
        overlayBackgroundColor="#ebdda0"
      >
        <View>
          <Text style={styles.text}>Ye' found the booty!!!</Text>
          <TouchableOpacity
            style={styles.successOverlayBtn}
            onPress={() => makeSuccessOverlayVisible(false)}
          >
            <Text style={styles.text}>Next Clue</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay
        isVisible={isFailureOverlayVisible}
        onBackdropPress={() => makeFailureOverlayVisible(false)}
        height={200}
        overlayBackgroundColor="#ebdda0"
      >
        <View>
          <Text style={styles.text}>Ye' be not quite there. Arghhhh!!!</Text>
          <TouchableOpacity
            style={styles.failureOverlayBtn}
            onPress={() => makeFailureOverlayVisible(false)}
          >
            <Text style={styles.text}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <ScrollView showsVerticalScrollIndicator={false}>
        {fontLoaded && props.user.game.startTime && props.user.game.endTime ? (
          <View>
            {props.gameUserScore[0] ? (
              <Text style={styles.hintText}>
                yer score: {props.gameUserScore[0].score}
              </Text>
            ) : (
              <Text style={styles.hintText}> yer score: 0</Text>
            )}
            {hint ? (
              <Text style={styles.hintText}>this clue be worth: 5 coins</Text>
            ) : (
              <Text style={styles.hintText}>this clue be worth: 10 coins</Text>
            )}
            <View style={styles.clueImgContainer}>
              <Text style={styles.headerText}>
                Ye're lookin' fer this matey!
              </Text>
              <View style={styles.imgContainer}>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    borderColor: 'black',
                    borderWidth: 1
                  }}
                  source={{uri: clues[currentClue].pictures[0].accessPic}}
                />
              </View>
            </View>
            <Text style={styles.text}>Clue: {clues[currentClue].text}</Text>
            {!hint ? (
              <TouchableOpacity
                style={styles.hintBtn}
                onPress={() => setHint(1)}
              >
                <Text style={styles.btnText}>Show Hint</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.text}>Hint: {clues[currentClue].hint}</Text>
            )}
            {!hint ? (
              <Text style={styles.hintText}>
                If ye click for the hint ye'll lose 5 coins... Argghhhhh!
              </Text>
            ) : null}
            <TouchableOpacity style={styles.btn} onPress={() => pressHandler()}>
              <Text style={styles.btnText}>I found it!</Text>
            </TouchableOpacity>
            <View style={styles.timerContainer}>
              <CountDown
                until={(new Date(props.user.game.endTime) - new Date()) / 1000}
                onFinish={() => props.navigation.navigate('GameOver')}
                size={30}
                digitStyle={{
                  backgroundColor: '#ebdda0',
                  borderWidth: 1,
                  borderColor: 'black'
                }}
                digitTxtStyle={{fontFamily: 'Kranky-Regular', color: 'black'}}
                timeLabelStyle={{
                  color: 'black',
                  fontFamily: 'Kranky-Regular',
                  fontSize: 16
                }}
                // separatorStyle={{color: 'black'}}
                // showSeparator // this puts : between each time unit element
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
  timerContainer: {
    marginTop: 40
  },
  imgContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  currClueTitle: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold'
  },
  currClueText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    flex: 0,
    padding: 50
  },
  clueImgContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  btn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 20
  },
  hintBtn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#ebdda0',
    justifyContent: 'center',
    marginTop: 20
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
  text: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  hintText: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginTop: 10
  },
  btnText: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  failureOverlayBtn: {
    width: WIDTH - 100,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 40
  },
  successOverlayBtn: {
    width: WIDTH - 100,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: '#E20014',
    justifyContent: 'center',
    marginTop: 80
  }
});

const mapState = state => ({
  user: state.user,
  gameUserScore: state.gameUserScore
});

const mapDispatch = {
  currentCluePlus,
  getSingleGameThunk,
  addScoreThunk,
  fetchGameUserScore
};

export default connect(mapState, mapDispatch)(CluePage);
