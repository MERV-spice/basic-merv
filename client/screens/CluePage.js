import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {useState} from 'react';
import {connect} from 'react-redux';
import {currentCluePlus} from '../store/user';
import {getSingleGameThunk} from '../store/games';
import CountDown from 'react-native-countdown-component';
import parchment from '../../assets/parchment.jpg';
import * as Font from 'expo-font';

const {width: WIDTH} = Dimensions.get('window');

const CluePage = props => {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  React.useEffect(() => {
    Font.loadAsync({
      'Kranky-Regular': require('../../assets/fonts/Kranky-Regular.ttf')
    }).then(setFontLoaded(true));
    props.getSingleGameThunk(props.user.game.id);
  }, []);
  const clues = props.user.game.clues;
  const currentClue = props.user.currentClue;

  const [score, setScore] = useState(0);
  const [hint, setHint] = useState(0);

  const pressHandler = () => {
    props.navigation.navigate('Camera', {
      setScore,
      id: clues[currentClue].pictures[0].id
    });
  };

  const thenFun = () => {
    setScore(0);
    props.currentCluePlus(props.user);
    setHint(0);
  };

  if (score > 0.7) thenFun();
  if (currentClue >= clues.length) {
    props.navigation.navigate('GameOver');
    return <Text>hey</Text>;
  }

  return (
    <ImageBackground source={parchment} style={styles.container}>
      {fontLoaded && props.user.game.startTime && props.user.game.endTime ? (
        <View>
          <View style={styles.clueImgContainer}>
            <Text style={styles.headerText}>You're lookin' for this!</Text>
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
            <TouchableOpacity style={styles.hintBtn} onPress={() => setHint(1)}>
              <Text style={styles.btnText}>Show Hint</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.Text}>Hint: {clues[currentClue].hint}</Text>
          )}
          <TouchableOpacity style={styles.btn} onPress={pressHandler}>
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
  btnText: {
    fontFamily: 'Kranky-Regular',
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});

const mapState = state => ({
  user: state.user
});

const mapDispatch = {
  currentCluePlus,
  getSingleGameThunk
};

export default connect(mapState, mapDispatch)(CluePage);
