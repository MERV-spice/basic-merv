import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import  Camera  from '../screens/Camera'
import CluePage from '../screens/CluePage'
import GamesPage from '../screens/GamesPage'


const screens = {
	Camera: { screen: Camera },
	CluePage: { screen: CluePage },
	GamesPage: { screen: GamesPage }
}

const homeStack = createStackNavigator(screens)

export default createAppContainer(homeStack)