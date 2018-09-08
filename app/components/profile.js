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
import FontAwesome, { Icons } from 'react-native-fontawesome'
import CameraScan from './scanCamera'
import Auth from './auth'
import api from '../config/feathers'

const { width, height } = Dimensions.get('window')

class Profile extends Component {

	constructor(props){
		super(props)

		this.state = {
			countCodes:0
		}

	}

	openDrawerButton(){

		this.props.mainNavProps.navigate('DrawerOpen')

	}

	componentWillMount(){

		const serviceCodes = api.service('qrscannings')
		let token = this.props.user.token
		let user = this.props.user.user
		let that = this

		serviceCodes.find({
			query:{
				"user_id":user.id
			}
		}).then(({data})=>{
			
			that.setState({
				countCodes:data.length
			})

		})

	}

	render(){

		let userInfo = this.props.user



		return(
			<View style={styles.fullScreenView}>

				<Text style={styles.infoTextUser}><FontAwesome>{Icons.user}</FontAwesome> Email: { userInfo.user.email }</Text>
				<Text style={styles.infoTextUser}><FontAwesome>{Icons.list}</FontAwesome> Штрих кодов на сервере: { this.state.countCodes }</Text>
				<Text style={styles.buttonSignOut} onPress={this.props.logoutUser}>завершить сеанс</Text>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	infoTextUser:{
		padding:7,
		marginBottom:5,
		backgroundColor:'rgba(0,0,0,0.1)',
		borderRadius:4,
		fontSize:18
	},
	buttonSignOut:{
		height:50,
		position:'absolute',
		bottom:0,
		left:0,
		justifyContent:'center',
		textAlign:'center',
		paddingTop:10,
		width:width,
		backgroundColor:'rgba(193, 64, 64, 0.89)',
		color:'#fff',
		fontSize:19
	},
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
	fullScreenView:{
		position:'relative',
		width:width,
		height:height,
		top:0,
		left:0,
		paddingTop:40,
		paddingLeft:10,
		paddingRight:10
	},
})

const mapStateToProps = (state) => {
	return{
		user:state.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		logoutUser:()=>{
			const logoutUser = () => {
				api.logout()
				return dispatch({
					type:'UPDATE_USER',
					logedin:false,
					user:{email:''},
					token:''
				})
			}
			dispatch(logoutUser())
		}
	}
}

export default connect(mapStateToProps, dispatchToProps)(Profile)