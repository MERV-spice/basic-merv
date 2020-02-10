import React from 'react';
import Navigator from '../routes/tab';
import Login from './Login';
import {connect} from 'react-redux';
import {fetchGames} from '../store/games';
import {fetchClues} from '../store/clues';
import {AppLoading} from 'expo';
import GameOver from '../components/GameOver';
import SignUp from '../components/SignUp';

const Route = ({user, fetchGames, fetchClues}) => {
  const [isReady, setIsReady] = React.useState(false);

  const loadItems = async () => {
    const arr = [];
    arr.push(fetchGames());
    arr.push(fetchClues());
    return Promise.all(arr);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadItems}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <React.Fragment>
      {user.id ? (
        <React.Fragment>
          {/* <SignUp /> */}
          {/* <GameOver /> */}
          <Navigator />
        </React.Fragment>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
};

const mapState = () => state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  fetchGames: () => dispatch(fetchGames()),
  fetchClues: () => dispatch(fetchClues())
});

export default connect(mapState, mapDispatch)(Route);
