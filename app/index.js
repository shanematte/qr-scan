import React, { Component } from 'react'
import getStore from './store/index'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import MainRoute from './routes/index'
import SplashScreen from 'react-native-splash-screen'

import {
	View,
	Text
} from 'react-native'


const navReducer = (state, action) => {
  	const nextState = MainRoute.router.getStateForAction(action, state)
  	return nextState || state
}

class StartApp extends Component {

	componentDidMount(){

		setTimeout(()=>{

			SplashScreen.hide()

		}, 3700)
		
	}

	render(){
		return(
		    <MainRoute navigation={addNavigationHelpers({
		        dispatch: this.props.dispatch,
		        state: this.props.nav,
		    })} />
		)
	}

}

const mapStateToProps = (state) => ({
  	nav: state.nav,
  	config:state.config,
  	state:state
})

const AppWithNavigationState = connect(mapStateToProps)(StartApp)

const store = getStore(navReducer)

class Root extends Component {

  	render() {
	    return (
	      	<Provider store={store}>
	        	<AppWithNavigationState />
	      	</Provider>
	    )
  	}

}

export default Root