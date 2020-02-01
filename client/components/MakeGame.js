import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default class MakeGame extends React.Component {
  constructor() {
    super()
    this.state = {
      userId: null,
      gameName: '',
      gameClues: [], 
      clueNum: 1, 
      clueImgId: '',
      clueText: '',
      createClue: false,
      startGame: null, 
      endGame: null,
      private: false,
    }
  }

  componentDidMount() {
    this.setState({userId: /* how will we be storing userId? */ null })
  }

  newClueText() {
    this.setState({createClue: true})
  }

  selectFromClues() {
    this.setState({createClue: false})
  }

  addclue() {
    this.setState({gameClues: [...this.state.gameClues,  {clueNum: this.state.clueNum, clueImgId: this.state.clueImgId, clueText: this.state.clueText}]})
    this.setState({clueNum: this.state.clueNum+1, clueImgId: '', clueText: '', createClue: false})
  }
  
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.newGameHeader}>New Game </Text>

          <Text style={styles.newGameSubHeader}>Game Name: </Text>
          <TextInput value={this.state.gameName}
            onChangeText={gameName => this.setState({gameName})} />

          <Text style={styles.newGameSubHeader}>Clues: </Text>
          {/* preexisting clues for this game */}
          {this.state.gameClues.length > 0 ? 
          this.state.clues.forEach(clue => (
            <React.Fragment key={`${clue.userId + clue.gameName + clue.clueNum}`}>
              <Text style={styles.newGameSubHeader}>Clue {clue.clueNum}: </Text>
              <Text style={styles.newGameText}>Image: {clue.clueImgId}</Text>
              {/* Make this access the image itself from an upload or from selected 
              images in preexisting clues */}
              <Text style={styles.newGameText}>Clue Text: {clue.clueText}</Text>
            </React.Fragment>
            )) : <React.Fragment />}
            {/* new clue for this game */}
            <React.Fragment>
              <Text style={styles.newGameSubHeader}>Clue {this.state.clueNum}: </Text>
              <Text style={styles.newGameText}>Clue Text: </Text>
              {/* select from database or create new clue */}
              <Button title="Pick a Clue" onPress={this.selectFromClues.bind(this)}/>
              <Button title="Create a New Clue" onPress={this.newClueText.bind(this)} />
              {this.state.createClue ? 
              // if you are creating a clue from scratch
                <React.Fragment>
                  <Text style={styles.newGameText}>Clue Text: </Text>
                  <TextInput 
                    value={this.state.clueText} 
                    onChangeText={clueText => this.setState({clueText})}
                    >
                  </TextInput> 
                  <Text style={styles.newGameText}>Clue Image: </Text>
                  <Button title="Take a New Image" />
                  {/* Button will link to camera component, on press for camera button 
                  will return to make game page, update state with resulting image id */}
                </React.Fragment>
                : 
                // if you are using a clue from the database
                <React.Fragment>
                <Text style={styles.newGameText}>Image: </Text>
                <Button title="Select an Image" />
                {/* popup with database images for selected clue, on select update state 
                with image id info*/}
                </React.Fragment>
              }
            <Button title="Add Clue"  onPress={this.addclue.bind(this)} />
            </React.Fragment>

            <Text style={styles.newGameText}>Start of Game: </Text>
              
            <Text style={styles.newGameText}>End of Game: </Text>
            {/* How to make an input that specifically represents hours/days/weeks as units of 
            time. Will this be two dropdowns, one to say number and one to say units? */}
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
