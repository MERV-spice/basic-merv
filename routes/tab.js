import { createBottomTabNavigator } from 'react-navigation-tabs'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import  Camera  from '../screens/Camera'
import CluePage from '../screens/CluePage'
import GamesPage from '../screens/GamesPage'

const screens = {
	GamesPage: {
		screen: GamesPage,
		navigationOptions: {
			tabBarLabel: 'GamesPage',


		}
	},	
	CluePage: {
		screen: CluePage,
		navigationOptions: {
			tabBarLabel: 'CluePage',

		},
	},
	Camera: {
		screen: Camera,
		navigationOptions: {
			tabBarLabel: 'Camera',

			
		}
	},
}


const tab = createBottomTabNavigator(screens, {
	tabBarOptions:
	{
		visible: false
	}
})

export default createAppContainer(tab)
