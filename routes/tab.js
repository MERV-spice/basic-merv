import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import Camera from '../screens/Camera';
import CluePage from '../screens/CluePage';
import GamesPage from '../screens/GamesPage';
import GameOver from '../screens/GameOver';
import {createStackNavigator} from 'react-navigation-stack';

const screens = {
  GamesPage: {
    screen: GamesPage,
    navigationOptions: {
      tabBarLabel: 'GamesPage'
    }
  },
  CluePage: {
    screen: CluePage,
    navigationOptions: {
      tabBarLabel: 'CluePage'
    }
  }
};

const tab = createBottomTabNavigator(screens, {
  tabBarOptions: {
    visible: false
  }
});

const appCon = createStackNavigator({
  tabs: tab,
  Camera: {
    screen: Camera,
    navigationOptions: {
      tabBarLabel: 'Camera'
    }
  },
  GameOver: {
    screen: GameOver,
    navigationOptions: {
      tabBarLabel: 'GameOver'
    }
  }
});

export default createAppContainer(appCon);
