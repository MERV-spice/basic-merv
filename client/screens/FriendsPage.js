import React from 'react';
import {
  TextInput,
  View,
  FlatList,
  Text,
  Button,
  SafeAreaView
} from 'react-native';
import axios from 'axios';
import url from '../ngrok';
import {connect} from 'react-redux';
import {fetchRequests, makeRequest} from '../store/request';
import {addFriend} from '../store/user';

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
    <SafeAreaView style={{flex: 1}}>
      <Text>Current Friend Requests</Text>
      <FlatList
        style={{flex: 1}}
        data={requests.received}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>username: {item.user.username}</Text>
            <Button
              title="Accept Friend Request"
              onPress={() => addNewFriend(item.id, item.fromUser)}
            />
          </View>
        )}
      />

      <Text>Current Friends:</Text>
      <FlatList
        style={{flex: 1}}
        data={friends}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Text>{item.username}</Text>}
      />

      <Text>Search for users</Text>
      <TextInput
        style={{height: 40}}
        onChangeText={text => setInput(text)}
        value={input}
        keyboardAppearance="dark"
        returnKeyType="search"
        onSubmitEditing={() => searchForUser(input)}
      />
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        extraData={[searchResults, requests]}
        style={{flex: 1}}
        renderItem={({item}) => (
          <View>
            <Text>username: {item.username}</Text>
            {requests.sent.filter(req => req.userId === item.id).length ? (
              <Text>Friend Request Pending</Text>
            ) : requests.received.filter(req => req.fromUser === item.id)
              .length ? (
              <Button
                title="Accept Friend Request"
                onPress={() => addNewFriend(item.id, item.fromUser)}
              />
            ) : (
              <Button
                onPress={() => makeNewRequest('friendRequest', item.id)}
                title="Add Friend"
              />
            )}
          </View>
        )}
      />
    </SafeAreaView>
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
