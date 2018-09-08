import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableHighlight
} from 'react-native'
import api from '../config/feathers'
import FontAwesome, { Icons } from 'react-native-fontawesome'

const { width, height } = Dimensions.get('window')

class Home extends Component {

	routeNav(nav){
		let { navigate } = this.props.navigation

		return navigate(nav)
	}

	openDrawerButton(){
		
		this.props.navigation.navigate('DrawerOpen')
	}

	componentWillReceiveProps(props) {

		if(props.state.user.token !== this.props.state.user.token){
			this.authMainUser(props.state.user.token, props)
		}
	  	
	}

	authMainUser(token, data){
		
		let that = this
		let userService = api.service('users')

		api.authenticate({
			strategy:'jwt',
			accessToken:token
		}).then((data)=>{
			
			userService.get().then((user)=>{

				that.props.userAuth(user, data.accessToken, true)

			})

		})

	}

	render(){
		return(
			<View style={styles.fullScreenView}>
				
				<View style={styles.bgImage}>
					<View style={styles.bgNavColor}></View>
					<Image style={styles.bgNav} source={require('../media/nav.jpg')}/>
				</View>
				<View style={styles.contentNavigation}>

					<Text style={styles.iconNavView} onPress={this.openDrawerButton.bind(this)}>
						<FontAwesome style={styles.iconNavView}>
							
							{ Icons.bars }
							
						</FontAwesome>
					</Text>

					<View style={styles.mainView}>
						
						<View style={styles.logoView}>
							<Image style={styles.logoImage} source={require('../media/logo.png')} />
						</View>

					    <TouchableHighlight style={styles.buttonScanRouteMain} onPress={this.routeNav.bind(this, 'Сканировать')}>
					      	<Text style={styles.buttonScanRouteText}>СКАНИРОВАТЬ</Text>
					    </TouchableHighlight>
					    <TouchableHighlight style={styles.buttonScanRoute} onPress={this.routeNav.bind(this, 'Результаты')}>
					      	<Text style={styles.buttonScanRouteText}>РЕЗУЛЬТАТЫ</Text>
					    </TouchableHighlight>
					    <TouchableHighlight style={styles.buttonScanRoute} onPress={this.routeNav.bind(this, 'Профиль')}>
					      	<Text style={styles.buttonScanRouteText}>ПРОФИЛЬ</Text>
					    </TouchableHighlight>
					</View>
					
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	logoImage:{
		width:width/1.5,
		height:110,
		resizeMode:'contain'
	},
	logoView:{
		width:width,
		height:120,
		justifyContent:'center',
		alignItems:'center'
	},
	iconNavView:{
		position:'absolute',
		top:10,
		left:10,
		zIndex:100000,
		fontSize:33,
		width:35,
		height:35,
		justifyContent:'center',
		alignItems:'center',
	},
	buttonScanRouteText:{
		color:'#fff',
		fontSize:22
	},
	buttonScanRoute:{
		width:width/1.7,
		height:70,
		backgroundColor:'rgba(0,0,0,0.9)',
		borderRadius:7,
		justifyContent:'center',
		alignItems:'center',
		marginTop:20
	},
	buttonScanRouteMain:{
		width:width/1.7,
		height:70,
		borderRadius:7,
		justifyContent:'center',
		alignItems:'center',
		marginTop:20,
		backgroundColor:'#ea0884'
	},
	contentNavigation:{
		position:'absolute',
		top:0,
		left:0,
		height:height,
		width:width,
		zIndex:100
	},
	fullScreenView:{
		position:'relative',
		width:width,
		height:height,
		top:0,
		left:0
	},
	bgImage:{
		position:'absolute',
		top:0,
		left:0,
		height:height,
		width:width,
		zIndex:1
	},
	bgNav:{
		width:width,
		height:height,
		resizeMode:'cover'
	},	
	bgNavColor:{
		position:'absolute',
		backgroundColor:'rgba(255,255,255,0.7)',
		top:0,
		left:0,
		height:height,
		width:width,
		zIndex:5
	},
	mainView:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	textHeader:{
		fontSize:20,
		color:'#e4256a'
	},
})

const mapStateToProps = (state) => {
	return{
		state:state
	}
}

const dispatchToProps = (dispatch) => {
	return {
		userAuth:(user, token, logedin)=>{

			const userAuth = () => {
				return dispatch({
					type:'UPDATE_USER',
					user:user,
					token:token,
					logedin:logedin
				})
			}

			dispatch(userAuth())

		},
	}
}

export default connect(mapStateToProps, dispatchToProps)(Home)