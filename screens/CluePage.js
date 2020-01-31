import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

export default function CluePage({ navigation }) {
	const pressHandler = () => {
		navigation.navigate('GamesPage')
	}
  return (
    <View style={styles.container}>
      <Text style={styles.currClueTitle}>Clue: </Text>
      <Text style={styles.currClueText}>
        Find a yellow brick in a red wall.
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
    color: 'black',
    fontSize: 25
  }
})
