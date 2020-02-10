import React, {Component} from 'react';
import {
  TextInput,
  View,
  FlatList,
  Text,
  Button,
  ScrollView
} from 'react-native';
import axios from 'axios';
import url from '../ngrok';
import {connect} from 'react-redux';
import {fetchRequests, makeRequest, addFriend} from '../store/request';

const FriendsPage = ({
  requests,
  fetchRequests,
  makeRequest,
  addFriend,
  friends
}) => {
  const [input, setInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const setter = async () => await fetchRequests();
    setter();
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
    <ScrollView>
      <Text>Current Friend Requests</Text>
      <FlatList
        data={requests.received}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>username: {item.user.username}</Text>
            <Button
              title="Accept Friend Request"
              onPress={() => addFriend(item.id, item.fromUser)}
            />
          </View>
        )}
      />

      <Text>Current Friends:</Text>
      <FlatList
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
        renderItem={({item}) => (
          <View>
            <Text>username: {item.username}</Text>
            {requests.sent.filter(req => req.userId === item.id).length ? (
              <Text>Friend Request Pending</Text>
            ) : requests.received.filter(req => req.fromUser === item.id)
              .length ? (
              <Button
                title="Accept Friend Request"
                onPress={() => addFriend(item.id, item.fromUser)}
              />
            ) : (
              <Button
                onPress={() => makeRequest('friendRequest', item.id)}
                title="Add Friend"
              />
            )}
          </View>
        )}
      />
    </ScrollView>
  );
};

const mapState = state => ({
  requests: state.requests,
  friends: state.user.Friend
});

const mapDispatch = {
  fetchRequests,
  makeRequest,
  addFriend
};

export default connect(mapState, mapDispatch)(FriendsPage);
