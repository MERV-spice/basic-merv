import {Alert} from 'react-native';

const findCoordinates = fn => {
  navigator.geolocation.getCurrentPosition(
    position => {
      fn(position);
    },
    error => Alert.alert(error.message)
  );
};

export default findCoordinates;
