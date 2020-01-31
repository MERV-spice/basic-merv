import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const MakeGame = () => {
    constructor() {
        super() 
        state = {
            
        }
    }
    return (
        <View style={styles.container}>
            {/*  */}
            {/* this has to render once, plus each previous clue must render above, like with 
            leaving reviews during grace shopper*/}
            <Text style={styles.newGameHeader}>New Game </Text>
            <Text style={styles.newGameSubHeader}>Clue: </Text>
            {/* How to add input in react native */}
            <Text style={styles.newGameText}>Text: </Text>
            <Text style={styles.newGameText}>Image: </Text>
            <Button title="Upload" />
            <Button title="Add Clue" />
            {/*  */}
            <Text style={styles.newGameText}>Length of game: </Text>
            {/* How to make an input that specifically represents hours/days/weeks as units of 
            time. Will this be two dropdowns, one to say number and one to say units? */}
            <Text style={styles.newGameText}>Start: </Text>
            <Text style={styles.newGameText}>This game will be: </Text>
            {/* Radio? Select one: Public or private. Automatically generate key code upon 
            selecting private. Perhaps connect with faker. Automatically copy it to clipboard 
            and maybe also automatically email key code to game maker for them to share. 
            Potentially in the future share it with users via their username. Might not be too 
            hard since we already have their emails*/}
            <Button title="Make Game" />
            {/* Where will this button link to? */}
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
    newGameHeader: {
      color: 'black',
      fontSize: 35,
      fontWeight: 'bold'
    },
    newGameSubHeader: {
        color: 'black', 
        fontSize: 30,
        fontWeight: 'bold'
    },
    newGameText: {
      color: 'black',
      fontSize: 25
    }
})

export default MakeGame;