import React from 'react';
import Navigator from '../routes/tab';
import Login from './Login';
import {connect} from 'react-redux';

const Route = ({user}) => {
  return (
    <React.Fragment>
      {user.id ? (
        <React.Fragment>
          <Navigator />
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
