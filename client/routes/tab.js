import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import Camera from '../screens/Camera';
import {createStackNavigator} from 'react-navigation-stack';
import CluePage from '../screens/CluePage';
import GameOver from '../screens/GameOver';
import Scene from '../screens/Scene';

const screens = {
  GamesPage: {
    screen: Scene,
    navigationOptions: {
      headerShown: false,
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
  },
  navigationOptions: {
    headerShown: false
  }
});

const appCon = createStackNavigator({
  Home: tab,
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
