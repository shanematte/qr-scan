import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native'
import { connect } from 'react-redux'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import Profile from './profile'
import FormLogin from './formLogin'

const { width, height } = Dimensions.get('window')

class Auth extends Component {

	constructor(props){
		super(props)

		this.state = {
			statusCheckServer:false
		}

	}

	openDrawerButton(){

		this.props.navigation.navigate('DrawerOpen')

	}

	render(){

		const user = this.props.user
		const userContent = user.logedin == true ? <Profile/> : <FormLogin/>

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
						
						{ userContent }

					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	iconNavView:{
		position:'absolute',
		top:10,
		left:10,
		zIndex:100000,
		fontSize:21,
		width:25,
		height:25,
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
		marginTop:50
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
		user:state.user
	}
}

const dispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, dispatchToProps)(Auth)