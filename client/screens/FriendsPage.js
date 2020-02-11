import React from 'react';
import {
  TextInput,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import url from '../ngrok';
import {connect} from 'react-redux';
import {fetchRequests, makeRequest} from '../store/request';
import {addFriend} from '../store/user';
import parchment from '../../assets/parchment.jpg';
import * as Font from 'expo-font';

const {width: WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 2
  },
  allHolder: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20
  },
  listContainer: {
    borderRadius: 200,
    borderWidth: 2,
    flex: 1,
    width: WIDTH - 10,
    backgroundColor: 'rgba(34, 158, 212, .4)'
  },
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 40,
    width: WIDTH - 40,
    marginBottom: 10,
    backgroundColor: 'pink',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  titles: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#E20014',
    marginLeft: 25,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 16
  },
  text: {
    fontSize: 16
  }
});

const FriendsPage = ({
  requests,
  setRequests,
  makeNewRequest,
  addNewFriend,
  friends
}) => {
  const [input, setInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    setRequests();
  }, []);

  const searchForUser = async value => {
    try {
      const {data} = await axios.get(`${url}/api/users/${value}`);
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ImageBackground source={parchment} style={styles.container}>
      <SafeAreaView style={styles.allHolder}>
        <Text style={styles.titles}>Current Friend Requests</Text>
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.contentContainerStyle}
          data={requests.received}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.text}>username: {item.user.username}</Text>
              <TouchableOpacity
                onPress={() => addNewFriend(item.id, item.fromUser)}
              >
                <Text style={styles.button}>Accept Friend Request</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Text style={styles.titles}>Current Friends:</Text>
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.contentContainerStyle}
          data={friends}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Text style={styles.text}>{item.username}</Text>
          )}
        />

        <Text style={styles.titles}>Search for users</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setInput(text)}
          value={input}
          keyboardAppearance="dark"
          returnKeyType="search"
          onSubmitEditing={() => searchForUser(input)}
        />
        <FlatList
          data={searchResults}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item.id.toString()}
          extraData={[searchResults, requests]}
          style={{...styles.listContainer, marginBottom: 5}}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.text}>username: {item.username}</Text>
              {requests.sent.filter(req => req.userId === item.id).length ? (
                <Text style={{...styles.text, marginLeft: 52}}>Pending</Text>
              ) : requests.received.filter(req => req.fromUser === item.id)
                .length ? (
                <TouchableOpacity
                  onPress={() => addNewFriend(item.id, item.fromUser)}
                >
                  <Text style={styles.button}>Accept Friend Request</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => makeNewRequest('friendRequest', item.id)}
                >
                  <Text style={styles.button}>Add Friend</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const mapState = state => ({
  requests: state.requests,
  friends: state.user.Friend
});

const mapDispatch = dispatch => ({
  setRequests: () => dispatch(fetchRequests()),
  makeNewRequest: (type, id) => dispatch(makeRequest(type, id)),
  addNewFriend: (id, fromUser) => dispatch(addFriend(id, fromUser))
});

export default connect(mapState, mapDispatch)(FriendsPage);
