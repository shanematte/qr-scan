import React from 'react'
import { connect } from 'react-redux'
import {
	ScrollView,
	Text,
	View,
	Image,
	Dimensions
} from 'react-native'
//screens app
import Home from '../components/home'
import Scannig from '../components/scannig'
import ListCodes from '../components/listCodes'
import About from '../components/about'
import Auth from '../components/auth'
import DrawerComponent from '../components/drawerComponent'
import PreviewScan from '../components/previewScan'
import PageTimeCodes from '../components/pageTime'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'
import SendToEmail from '../components/sendToEmail'

const { width, height } = Dimensions.get('window')

const appRoutes = DrawerNavigator({
	"Главная":{
		screen:Home
	},
	"Профиль":{
		screen:Auth
	},
	"Результаты":{
		screen:ListCodes
	},
	"О программе":{
		screen:About
	}	
}, {
	drawerWidth:width/1.3,
	contentOptions:{
		activeTintColor: '#e4256a',
		inactiveTintColor:'rgba(0,0,0,0.7)'
	},
	contentComponent: props => (<DrawerComponent navigateMain={props}/>)
})

const MainRoute = StackNavigator({
	"appRoutes":{
		screen:appRoutes
	},
	"preview":{
		screen:PreviewScan
	},
	"listCodes":{
		screen:PageTimeCodes
	},
	"Сканировать":{
		screen:Scannig
	},	
	"Отправить на почту":{
		screen:SendToEmail
	}
},{
	headerMode: "none",
})

export default MainRoute


