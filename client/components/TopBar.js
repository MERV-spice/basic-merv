import React from 'react';
import {Button, Text, View, AsyncStorage} from 'react-native';

const TopBar = ({setShowNotifications, navigation}) => {
  const logOut = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
    navigation.navigate('Login');
  };

  return (
    <View
      style={{
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
      }}
    >
      <View style={{width: 30}}>
        <Button style={{width: 30}} title="X" onPress={() => logOut} />
      </View>
      <Text>Ahoy!</Text>
      <View style={{width: 30}}>
        <Button title="N" onPress={() => setShowNotifications()} />
      </View>
    </View>
  );
};

export default TopBar;
