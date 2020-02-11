import React from 'react';
import Navigator from '../routes/tab';
import {connect} from 'react-redux';
import {fetchGames} from '../store/games';
import {fetchClues} from '../store/clues';
import {fetchRequests} from '../store/request';
import {AppLoading, Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

const Route = ({setGames, setClues, setRequests}) => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const perms = async () => {
      await Permissions.askAsync(Permissions.CAMERA);
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    };
    perms();
  }, []);

  const loadItems = () => {
    const arr = [];
    arr.push(setGames());
    arr.push(setClues());
    return Promise.all(arr);
  };

  const finishLoad = () => {
    setIsReady(true);
    Notifications.addListener(setRequests);
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
    </React.Fragment>
  );
};

const mapDispatch = dispatch => ({
  setGames: () => dispatch(fetchGames()),
  setClues: () => dispatch(fetchClues()),
  setRequests: () => dispatch(fetchRequests())
});

export default connect(null, mapDispatch)(Route);
