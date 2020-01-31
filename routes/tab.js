import { createBottomTabNavigator } from 'react-navigation-tabs'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import  Camera  from '../screens/Camera'
import CluePage from '../screens/CluePage'
import GamesPage from '../screens/GamesPage'

const screens = {
	Camera: {
		screen: Camera,
		navigationOptions: {
			tabBarLabel: 'Camera',
		}
	},
	
	CluePage: {
		screen: CluePage,
		navigationOptions: {
			tabBarLabel: 'CluePage',
		},
	},
	GamesPage: {
		screen: GamesPage,
		navigationOptions: {
			tabBarLabel: 'GamesPage'
		}
	},
}


const tab = createBottomTabNavigator(screens, { tabBarOptions: { showLabel: true } })

export default createAppContainer(tab)