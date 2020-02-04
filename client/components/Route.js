import React from 'react';
import Navigator from '../../routes/tab';
import Login from './Login';
import {connect} from 'react-redux';
import {Router, Scene} from 'react-native-router-flux';
import {MakeClueCamera, MakeGame} from './';
// import MakeGame from './';

const Route = ({user}) => {
  return (
    <React.Fragment>
      {user.id ? (
        <React.Fragment>
          {/* <Navigator />  */}
          <Router>
            <Scene key="root">
              <Scene key="makeGame" component={MakeGame} title="MakeGame" />
              <Scene
                key="makeClueCamera"
                component={MakeClueCamera}
                title="MakeClueCamera"
              />
            </Scene>
          </Router>
        </React.Fragment>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
};

mapState = () => state => ({
  user: state.user
});

export default connect(mapState)(Route);
