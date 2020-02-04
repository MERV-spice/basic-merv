import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ShadowPropTypesIOS
} from 'react-native';
import {useState} from 'react';
import {connect} from 'react-redux';
import {currentCluePlus} from '../client/store/user';

const CluePage = props => {
  const clues = props.user.game.clues;

  const currentClue = props.user.currentClue;

  const [score, setScore] = useState(0);

  //console.log('in clue page', props.user);
  const id = 'sky';
  const pressHandler = () => {
    props.navigation.navigate('Camera', {
      setScore,
      id
    });
  };
  const [hint, setHint] = useState(0);

  const thenFun = () => {
    setScore(0);
    console.log('in thenFun');
    props.currentCluePlus(props.user);
    setHint(0);
  };
  if (currentClue === clues.length) {
    console.log(clues.length, 'in cluepage');
    props.navigation.navigate('GameOver');
  }
  score > 0.7 ? thenFun() : console.log('in else');
  return (
    <View style={styles.container}>
      {currentClue < clues.length ? (
        <React.Fragment>
          <Text style={styles.currClueTitle}>Clue: </Text>
          <Image
            style={{width: 200, height: 200}}
            source={{uri: clues[currentClue].pictures[0].accessPic}}
          />
          <Text style={styles.currClueText}>
            Clue :{clues[currentClue].text}
          </Text>
          {!hint ? (
            <Button title="Show Hint" onPress={() => setHint(1)} />
          ) : (
            <Text>Hint: {clues[currentClue].hint}</Text>
          )}
          <Button title="I found it!" onPress={pressHandler} />
        </React.Fragment>
      ) : (
        <React.Fragment>{props.navigation.navigate('GameOver')}</React.Fragment>
      )}
    </View>
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
  }
});

const mapState = state => ({
  user: state.user
});

const mapDispatch = {
  currentCluePlus
};

export default connect(mapState, mapDispatch)(CluePage);
