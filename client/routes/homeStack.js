import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Camera from '../screens/Camera';
import CluePage from '../screens/CluePage';
import GamesPage from '../screens/GamesPage';

const screens = {
  GamesPage: {screen: GamesPage},
  CluePage: {screen: CluePage},
  Camera: {screen: Camera}
};

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);
