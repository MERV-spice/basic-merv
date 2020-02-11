import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Camera from '../screens/Camera';
import {createStackNavigator} from 'react-navigation-stack';

import CluePage from '../screens/CluePage';
import GameOver from '../components/GameOver';
import FriendsPage from '../screens/FriendsPage';
import GamesPage from '../screens/GamesPage'; //
import {MakeClueCamera, MakeGame, Login, SignUp} from '../components'; //

const screens = {
  GamesPage: {
    screen: GamesPage,
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
  },
  FriendsPage: {
    screen: FriendsPage,
    navigationOptions: {
      tabBarLabel: 'FriendsPage'
    }
  }
};

const tab = createBottomTabNavigator(screens, {
  tabBarOptions: {
    visible: false
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
      tabBarLabel: 'Camera'
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
      tabBarLabel: 'MakeGame'
    }
  },
  MakeClueCamera: {
    screen: MakeClueCamera,
    navigationOptions: {
      tabBarLabel: 'MakeClueCamera'
    }
  }
});

export default createAppContainer(appCon);
