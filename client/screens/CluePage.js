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
        // https://www.npmjs.com/package/react-native-countdown-component for info about timer component
        <CountDown
          until={(new Date(props.user.game.endTime) - new Date()) / 1000}
          onFinish={() => props.navigation.navigate('GameOver')}
          size={20}
          digitStyle={{
            backgroundColor: '#FFF',
            borderWidth: 2,
            borderColor: '#1CC625'
          }}
          digitTxtStyle={{color: '#1CC625'}}
          timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
          separatorStyle={{color: '#1CC625'}}
          showSeparator // this puts : between each time unit element
        />
      ) : null}
      <View style={styles.clueImgContainer}>
        <Text style={styles.text}>Clue: </Text>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: clues[currentClue].pictures[0].accessPic}}
        />
      </View>
      <Text style={styles.text}>Clue :{clues[currentClue].text}</Text>
      {!hint ? (
        <TouchableOpacity style={styles.btn} onPress={() => setHint(1)}>
          <Text style={styles.text}>Show Hint</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.text}>Hint: {clues[currentClue].hint}</Text>
      )}
      <TouchableOpacity style={styles.btn} onPress={pressHandler}>
        <Text style={styles.text}>I found it!</Text>
      </TouchableOpacity>
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

const mapState = state => ({
  user: state.user
});

const mapDispatch = {
  currentCluePlus,
  getSingleGameThunk
};

export default connect(mapState, mapDispatch)(CluePage);
