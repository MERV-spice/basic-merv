import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import Camera from '../screens/Camera';
import {createStackNavigator} from 'react-navigation-stack';
import CluePage from '../screens/CluePage';
import GameOver from '../components/GameOver';
import GamesPage from '../screens/GamesPage'; //
import {MakeClueCamera, MakeGame, Login} from '../components'; //

const screens = {
  GamesPage: {
    screen: GamesPage, //
    navigationOptions: {
      headerShown: false, //
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
  }, //
  navigationOptions: {
    //
    headerShown: false //
  }
});

const appCon = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: 'Login'
    }
  },
  Home: tab, //
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
  }, //
  MakeGame: {
    //
    screen: MakeGame, //
    navigationOptions: {
      //
      tabBarLabel: 'MakeGame' //
    } //
  }, //
  MakeClueCamera: {
    //
    screen: MakeClueCamera, //
    navigationOptions: {
      //
      tabBarLabel: 'MakeClueCamera' //
    } //
  }
});

export default createAppContainer(appCon);
