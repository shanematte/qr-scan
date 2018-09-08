import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	View,
	Text,
	StyleSheet,
	Vibration,
	Dimensions,
	Image
} from 'react-native'
import FormLogin from './formLogin'
import CameraScan from './scanCamera'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { NavigationActions } from 'react-navigation'

const { width, height } = Dimensions.get('window')

class Scanning extends Component {

	constructor(props){
		super(props)

		this.state = {
		    loaded:false
		}

	}

	openDrawerButton(){

		this.props.clearCode()
		this.props.cameraStatus(false)
		const resetAction = NavigationActions.reset({
		  index: 0,
		  actions: [
		    NavigationActions.navigate({ routeName: 'appRoutes'})
		  ]
		})
		this.props.navigation.dispatch(resetAction)

	}

	render(){

		let user = this.props.user

		let contentScan = <CameraScan navigator={this.props.navigation}/>

		return(
			<View style={styles.fullScreenView}>
				<View style={styles.bgImage}>
					<View style={styles.bgNavColor}></View>
					<Image style={styles.bgNav} source={require('../media/nav.jpg')}/>
				</View>
				<View style={styles.contentNavigation}>

					<Text style={styles.iconNavView} onPress={this.openDrawerButton.bind(this)}>
						<FontAwesome style={styles.iconNavView}>
							
							{ Icons.arrowLeft }
							
						</FontAwesome>
					</Text>

					{ contentScan }
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
		color:'rgba(255,255,255,0.7)',
		zIndex:100000,
		fontSize:33,
		width:35,
		height:35,
		justifyContent:'center',
		alignItems:'center',
	},
	finalText:{
		textAlign:'center'
	},
	scanViewCamera:{
		width:width-40,
		marginTop:20,
		marginBottom:20,
		marginLeft:20,
		backgroundColor:'rgba(0,0,0,0.2)',
		marginRight:20,
		height:height/2,
		borderRadius:10,
		position:'relative',
		overflow: 'hidden',
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
		backgroundColor:'rgba(255,255,255,0.5)',
		top:0,
		left:0,
		height:height,
		width:width,
		zIndex:5
	},
	mainView:{
		flex:1
	},
	textHeader:{
		fontSize:20,
		color:'#e4256a'
	},
})

const mapStateToProps = (state) => {
	return{
		codes:state.codes,
		user:state.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		cameraStatus:(status)=>{

			dispatch({
				type:'CAMERA_STATUS',
				cameraStatus:status
			})

		},
		clearCode: () => {

			dispatch({
				type:'CLEAR_CODE'
			})

		},
	}
}

export default connect(mapStateToProps, dispatchToProps)(Scanning)