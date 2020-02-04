import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  FlatList
} from 'react-native';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Actions} from 'react-native-router-flux';
import {addGameThunk} from '../store/games';
import {connect} from 'react-redux';

class MakeGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      gameName: '',
      gameClues: [],
      clueNum: 1,
      clueImg: {},
      clueText: '',
      createClue: null,
      startGame: null,
      endGame: null,
      private: false,
      keyCode: null,
      isDatePickerVisible: false,
      setDatePickerVisibility: false
    };
  }

  componentDidMount() {
    this.setState({userId: /* how will we be storing userId? */ null});
  }

  //   newClueText() {
  //     this.setState({createClue: true});
  //   }

  //   selectFromClues() {
  //     this.setState({createClue: false});
  //   }

  addClue() {
    let newGameClues = this.state.gameClues.concat([
      {
        clueNum: this.state.clueNum,
        clueImgId: this.state.clueImg.id,
        clueText: this.state.clueText,
        clueAccessPic: this.state.clueImg.accessPic
      }
    ]);
    this.setState({
      gameClues: newGameClues,
      clueNum: this.state.clueNum + 1,
      clueImg: {},
      clueText: '',
      createClue: false
    });
  }

  addGame() {
    let newGame = {
      name: this.state.gameName,
      clues: this.state.gameClues,
      makerId: this.state.userId
    };
    this.props.addGameThunk(newGame);
  }

  // showDatePicker() {
  //don't do it this way
  //   this.setState({setDatePickerVisibility: true});
  // }

  // hideDatePicker() {
  //don't do it this way
  //   this.setState({setDatePickerVisibility: false});
  // }

  // handleConfirm(/*date*/) {
  //don't do it this way
  //   // console.log('date: ', date);
  //   this.hideDatePicker();
  // }

  goToCamera() {
    Actions.makeClueCamera({fn: img => this.setState({clueImg: img})});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.newGameHeader}>New Game </Text>

        <Text style={styles.newGameSubHeader}>Game Name: </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={this.state.gameName}
          onChangeText={gameName => this.setState({gameName})}
        />

        <Text style={styles.newGameSubHeader}>Clues: </Text>
        {/* preexisting clues for this game */}
        {this.state.gameClues.length > 0 ? (
          <FlatList
            keyExtractor={item => item.clueNum.toString()}
            data={this.state.gameClues}
            renderItem={clue => {
              clue = clue.item;
              return (
                <React.Fragment key={clue.clueNum}>
                  <Text style={styles.newGameSubHeader}>
                    Clue {clue.clueNum}:{' '}
                  </Text>
                  <Text style={styles.newGameText}>Image: </Text>
                  <Image
                    style={{width: 50, height: 50}}
                    source={{uri: clue.clueAccessPic}}
                  />
                  <Text style={styles.newGameText}>
                    Clue Text: {clue.clueText}
                  </Text>
                </React.Fragment>
              );
            }}
          />
        ) : (
          <React.Fragment>
            <Text style={styles.newGameText}>
              No clues so far... try adding one!{' '}
            </Text>
          </React.Fragment>
        )}
        <React.Fragment>
          <Button
            title="Pick a Clue"
            onPress={() => this.setState({createClue: false})}
          />
          <Button
            title="Create a New Clue"
            onPress={() => this.setState({createClue: true})}
          />
          {this.state.createClue === null ? (
            <React.Fragment />
          ) : this.state.createClue === true ? (
            // if you are creating a clue from scratch
            <React.Fragment>
              <Text style={styles.newGameSubHeader}>
                Clue {this.state.clueNum}:{' '}
              </Text>
              <Text style={styles.newGameText}>Clue Text: </Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                value={this.state.clueText}
                onChangeText={clueText => this.setState({clueText})}
              />
              <Text style={styles.newGameText}>Clue Image: </Text>
              {this.state.clueImg.accessPic ? (
                <Image
                  style={{width: 50, height: 50}}
                  source={{uri: this.state.clueImg.accessPic}}
                />
              ) : null}
              <Button
                title="Take a New Image"
                onPress={this.goToCamera.bind(this)}
              />
              <Button title="Add Clue" onPress={this.addClue.bind(this)} />
            </React.Fragment>
          ) : // // if you are using a clue from the database
          // <React.Fragment>
          //   <Text style={styles.newGameSubHeader}>
          //     Clue {this.state.clueNum}:{' '}
          //   </Text>
          //   <Text style={styles.newGameText}>Clue Text: </Text>
          //   <Text style={styles.newGameText}>Image: </Text>
          //   <Button title="Select an Image" />
          //   {/* popup with database images for selected clue, on select update state
          //       with image id info*/}
          //   <Button title="Add Clue" onPress={this.addClue.bind(this)} />
          // </React.Fragment>
          null}
        </React.Fragment>

        {/* <Text style={styles.newGameText}>Start of Game: </Text>
            <Button title="Show Date Picker" onPress={this.showDatePicker.bind(this)} />
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm.bind(this)}
                onCancel={this.hideDatePicker.bind(this)}
              />
                <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="time"
                onConfirm={this.handleConfirm.bind(this)}
                onCancel={this.hideDatePicker.bind(this)}
              />
            <Text style={styles.newGameText}>End of Game: </Text> */}
        {/* How to make an input that specifically represents hours/days/weeks as units of 
            time. Will this be two dropdowns, one to say number and one to say units? */}
        {/* <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm.bind(this)}
                onCancel={this.hideDatePicker.bind(this)}
              />
                <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="time"
                onConfirm={this.handleConfirm.bind(this)}
                onCancel={this.hideDatePicker.bind(this)}
              /> */}
        {/* https://github.com/mmazzarolo/react-native-modal-datetime-picker 
              <---- link to github for troubleshooting date/time picker */}
        {/* <Text style={styles.newGameText}>This game will be: </Text>
              <RadioForm 
                radio_props = {[{label: 'public', value: false}, {label: 'private', value: true}]}
                initial = {false}
                onPress = {(value) => {this.setState({private: value})}}
              /> */}
        {/* https://github.com/moschan/react-native-simple-radio-button <--- info about radio 
              buttons github */}
        {/* Radio? Select one: Public or private. Automatically generate key code upon 
              selecting private. Perhaps connect with faker. Automatically copy it to clipboard 
              and maybe also automatically email key code to game maker for them to share. 
              Potentially in the future share it with users via their username. Might not be too 
              hard since we already have their emails*/}
        {/* What will this button do?, generate key code if this.state.private: true */}
        <Button title="Make Game" onPress={this.addGame.bind(this)} />
      </View>
    );
  }
}

const mapDispatch = {
  addGameThunk
};

export default connect(null, mapDispatch)(MakeGame);

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
});
