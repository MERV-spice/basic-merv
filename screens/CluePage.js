import React, {useEffect} from 'react'
import { StyleSheet, Text, View, Button, Image, ShadowPropTypesIOS } from 'react-native'
import { useState } from 'react'
import {connect} from 'react-redux'

 const Clue = [
 {
	lat: 67349,
	text: 'secondary',
	hint: 'dont worry about it',
	imageUrl: 'https://i.ebayimg.com/images/i/161658946524-0-1/s-l1000.jpg',
	points: 1,
	
	},
 {
	lat: 67350,
	text: 'primary',
	hint: 'this will be confusing',
	imageUrl: 'https://thumbs.dreamstime.com/b/green-red-yellow-brick-wall-background-reggae-style-59162839.jpg',
	points: 2
	},
 {
	lat: 67351,
	text: 'tertiary',
	hint: "you're out",
	imageUrl: 'https://img-aws.ehowcdn.com/877x500p/photos.demandstudios.com/getty/article/152/213/484171235.jpg',
	points: 3

	}
]

function CluePage(props) {

	
	const [selected, setSelected] = useState(0)
	const pressHandler = () => {
		setSelected(selected +1)
		props.navigation.navigate('Camera')
	}
	return (
    <View style={styles.container}>
			<Text style={styles.currClueTitle}>Clue: </Text>
			{/* <Image
				style= {{width: 200, height: 200}}
				source= {{uri: Clue[selected].imageUrl}} /> */}
      <Text style={styles.currClueText}>
        {Clue[selected].text}
			</Text>
			<Text>
				Points {/* Points Possible: {Clue[selected].points} */}
			</Text>
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


export default connect()(CluePage)