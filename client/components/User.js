import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount(

  // )

  //get score from db for a single user
  //get recent game names
  // get percent of clues completed
  //edit username and password

  render() {
    console.log(this.props.user);
    return (
      <React.Fragment>
        <Text>Username:</Text>
        <TextInput />
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  user: state.user
});

export default connect(mapState, null)(UserProfile);
