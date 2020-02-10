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
import {currentCluePlus} from '../store/user';
import {getSingleGameThunk} from '../store/games';

const CluePage = props => {
  React.useEffect(() => {
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
    return <Text>Good Game!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Game Starts At: {props.user.game.startTime}</Text>
      <Text>Game Ends At: {props.user.game.endTime}</Text>
      <Text style={styles.currClueTitle}>Clue: </Text>
      <Image
        style={{width: 200, height: 200}}
        source={{uri: clues[currentClue].pictures[0].accessPic}}
      />
      <Text style={styles.currClueText}>Clue :{clues[currentClue].text}</Text>
      {!hint ? (
        <Button title="Show Hint" onPress={() => setHint(1)} />
      ) : (
        <Text>Hint: {clues[currentClue].hint}</Text>
      )}
      <Button title="I found it!" onPress={pressHandler} />
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
  currentCluePlus,
  getSingleGameThunk
};

export default connect(mapState, mapDispatch)(CluePage);
