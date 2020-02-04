import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {MakeClueCamera, MakeGame} from '../client/components';
import GamesPage from './GamesPage';

const Games = ({}) => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="gamesPage" component={GamesPage} title="GamesPage" />
        <Scene key="makeGame" component={MakeGame} title="MakeGame" />
        <Scene
          key="makeClueCamera"
          component={MakeClueCamera}
          title="MakeClueCamera"
        />
      </Scene>
    </Router>
  );
};

export default Games;
