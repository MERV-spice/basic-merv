/* eslint-disable react/display-name */
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Camera from '../screens/Camera';
import {createStackNavigator} from 'react-navigation-stack';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Text} from 'react-native';

import CluePage from '../screens/CluePage';
import GameOver from '../components/GameOver';
import FriendsPage from '../screens/FriendsPage';
import GamesPage from '../screens/GamesPage'; //
import {MakeClueCamera, MakeGame, Login, SignUp} from '../components';

const screens = {
  GamesPage: {
    screen: GamesPage,
    navigationOptions: {
      headerShown: false,

      tabBarLabel: () => <Text>Games</Text>,
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons
          name="treasure-chest"
          size={25}
          color={tintColor}
        />
      )
    }
  },
  CluePage: {
    screen: CluePage,
    navigationOptions: {
      tabBarLabel: () => <Text>Clues</Text>,
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="ios-search" size={25} color={tintColor} />
      )
    }
  },
  FriendsPage: {
    screen: FriendsPage,
    navigationOptions: {
      tabBarLabel: () => <Text>Friends</Text>,
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="ios-people" size={25} color={tintColor} />
      )
    }
  }
};

const tab = createBottomTabNavigator(screens, {
  tabBarOptions: {
    visible: false,
    activeTintColor: '#E20014',
    style: {
      backgroundColor: '#ebdda0'
    }
  },
  navigationOptions: {
    headerShown: false, // this hides the header for gamespage and clue page
    headerLeft: () => null // if you want a header but do not want a back arrow turn the false above into true
  }
});

const appCon = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: 'Login'
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      tabBarLabel: 'SignUp'
    }
  },
  Home: tab,
  Camera: {
    screen: Camera,
    navigationOptions: {
      headerTitle: 'Camera',
      headerTintColor: '#E20014',
      headerStyle: {
        backgroundColor: '#ebdda0'
      }
    }
  },
  GameOver: {
    screen: GameOver,
    navigationOptions: {
      tabBarLabel: 'GameOver'
    }
  },
  MakeGame: {
    screen: MakeGame,
    navigationOptions: {
      tabBarLabel: 'MakeGame',
      activeTintColor: '#E20014'
    }
  },
  MakeClueCamera: {
    screen: MakeClueCamera,
    navigationOptions: {
      headerTitle: 'MakeClueCamera',
      headerTintColor: '#E20014',
      headerStyle: {
        backgroundColor: '#ebdda0'
      }
    }
  }
});

export default createAppContainer(appCon);
