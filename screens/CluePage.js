import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Button, Image, ShadowPropTypesIOS } from 'react-native'
import { useState } from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../client/store/games';
import { currentCluePlus } from '../client/store/user';


 

const CluePage = (props) => {

	const clues = props.user.game.clues

	const [score, setScore] = useState(0)

	console.log(props)
	const [selected, setSelected] = useState(0)
	const id = 'sky'
	const pressHandler = () => {
		setSelected(selected)
		props.navigation.navigate('Camera', {
			setScore, id
		})
	}
	const thenFun= () => {
		setScore(0);
		setSelected(selected + 1)
		setHint(0)
	}
	const [hint, setHint] = useState(0)
	score > .70 ? thenFun() : console.log('in else');
	return (
    <View style={styles.container}>
			<Text style={styles.currClueTitle}>Clue: </Text>
			<Image
				style= {{width: 200, height: 200}}
				source= {{uri: clues[selected].pictures[0].accessPic}} />
      <Text style={styles.currClueText}>
        Clue :{clues[selected].text}
			</Text>
			{!hint ? (<Button
				title='Show Hint' onPress={() => setHint(1)} />
			) : <Text> 
				Hint: {clues[selected].hint}
			</Text>}
      <Button title="I found it!" onPress={pressHandler} />
    </View>
  )
}



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
})

const mapState = state => ({
	user: state.user,
});

const mapDispatch = {
	currentCluePlus
}

export default connect(mapState, mapDispatch)(CluePage)