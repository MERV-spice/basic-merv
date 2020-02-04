import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import Camera from '../screens/Camera';
import CluePage from '../screens/CluePage';
import Scene from '../screens/Scene';

const screens = {
  GamesPage: {
    screen: Scene,
    navigationOptions: {
      tabBarLabel: 'GamesPage'
    }
  },
  CluePage: {
    screen: CluePage,
    navigationOptions: {
      tabBarLabel: 'CluePage'
    }
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      tabBarLabel: 'Camera'
    }
  }
};

const tab = createBottomTabNavigator(screens, {
  tabBarOptions: {showLabel: true}
});

export default createAppContainer(tab);
