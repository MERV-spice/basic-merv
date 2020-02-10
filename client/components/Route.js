import React from 'react';
import Navigator from '../routes/tab';
import Login from './Login';
import {connect} from 'react-redux';
import {fetchGames} from '../store/games';
import {fetchClues} from '../store/clues';
import {fetchRequests} from '../store/request';
import {AppLoading, Notifications} from 'expo';
import {Text, View, Button} from 'react-native';
import axios from 'axios';
import url from '../ngrok';
import NotificationOverlay from './NotificationOverlay';

const Route = ({user, fetchGames, fetchClues, fetchRequests}) => {
  const [isReady, setIsReady] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const ref = React.useRef(null);

  const loadItems = () => {
    const arr = [];
    arr.push(fetchGames());
    arr.push(fetchClues());
    arr.push(fetchRequests());
    return Promise.all(arr);
  };

  const finishLoad = () => {
    setIsReady(true);
    Notifications.addListener(fetchRequests);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadItems}
        onFinish={finishLoad}
        onError={console.warn}
      />
    );
  }

  return (
    <React.Fragment>
      <Navigator />
      <NotificationOverlay
        visible={showNotifications}
        setVisible={setShowNotifications}
      />
    </React.Fragment>
  );
};

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  fetchGames: () => dispatch(fetchGames()),
  fetchClues: () => dispatch(fetchClues()),
  fetchRequests: () => dispatch(fetchRequests())
});

export default connect(mapState, mapDispatch)(Route);
