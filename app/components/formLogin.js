import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	TouchableHighlight,
	ToastAndroid,
	Alert
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import CameraScan from './scanCamera'
import Auth from './auth'
import api from '../config/feathers'
import { Pulse } from 'react-native-loader'

const { width, height } = Dimensions.get('window')

class FormLogin extends Component {

	constructor(props){
		super(props)

		this.state = {
			selectForm:'login',
			email:'',
			password:'',
			repeatPassword:'',
			formStatusServer:false
		}

	}

	selectChangeForm(form){

		this.setState({
			selectForm:form
		})

	}

	loginUser(){
		let that = this

		let { email, password } = this.state

		if(email != '' && password != ''){

			that.props.loading(true)

			const userService = api.service('users')

			api.authenticate({
				strategy:'local',
				email:email,
				password:password
			}).then((data)=>{
				
				userService.get().then((user)=>{

					that.props.loading(false)

					that.props.userAuth(user, data.accessToken, true)

				})

			}).catch(({data})=>{

				that.props.loading(false)

				if(data.message === "Invalid login"){
					ToastAndroid.show('Email или пароль неверны', ToastAndroid.SHORT)
				}else{
					ToastAndroid.show('Ошибка на сервере, обратитесь в техническую поддержку', ToastAndroid.SHORT)
				}

			})

		}else{

			ToastAndroid.show('Заполните необходимые поля', ToastAndroid.SHORT)

		}

	}

	registerUser(){
		let that = this

		let { email, password, repeatPassword } = this.state

		if(repeatPassword === password){

			if(email != '' && password != ''){

				that.props.loading(true)

				const userService = api.service('users')

				userService.create({
					email:email,
					password:password
				}).then(()=>{
					
					api.authenticate({
						strategy:'local',
						email:email,
						password:password
					}).then((data)=>{
						
						userService.get().then((user)=>{

							that.props.loading(false)

							that.props.userAuth(user, data.accessToken, true)

						})

					})

				}).catch((data)=>{

					that.props.loading(false)

					if(data.message === 'повторяющееся значение ключа нарушает ограничение уникальности "users_email_key"'){
						ToastAndroid.show('Такой email или логин уже занят', ToastAndroid.SHORT)
					}else{
						ToastAndroid.show('Ошибка на сервере, обратитесь в техническую поддержку', ToastAndroid.SHORT)
					}
				})

			}else{
				ToastAndroid.show('Заполните необходимые поля', ToastAndroid.SHORT)
			}

		}else{

			ToastAndroid.show('Пароли не совпадают', ToastAndroid.SHORT)

		}

	}

	render(){

		let user = this.props.user

		console.log(this.props.config.loading)

		let selectButtons = this.state.selectForm == 'login' ? <View style={styles.selectFormUser}><Text onPress={this.selectChangeForm.bind(this, 'login')} style={styles.selectFormButtonActive}><FontAwesome>{Icons.signIn}</FontAwesome> Авторизация</Text><Text onPress={this.selectChangeForm.bind(this, 'register')} style={styles.selectFormButton}><FontAwesome>{Icons.user}</FontAwesome> Регистрация</Text></View> : <View style={styles.selectFormUser}><Text onPress={this.selectChangeForm.bind(this, 'login')} style={styles.selectFormButton}><FontAwesome>{Icons.signIn}</FontAwesome> Авторизация</Text><Text onPress={this.selectChangeForm.bind(this, 'register')} style={styles.selectFormButtonActive}><FontAwesome>{Icons.user}</FontAwesome> Регистрация</Text></View>

		let buttonUserPress = this.state.selectForm == 'login' ? <TouchableHighlight onPress={this.loginUser.bind(this)} style={styles.buttonPress}><Text style={styles.buttonPressText}>Авторизоваться</Text></TouchableHighlight> : <TouchableHighlight onPress={this.registerUser.bind(this)} style={styles.buttonPress}><Text style={styles.buttonPressText}>Регистрация</Text></TouchableHighlight>

		let loadingView = this.props.config.loading ? <View style={styles.loading}>
					<Pulse size={38} color="#ea0884" />
				</View> : <View></View>

		return(
			<View style={styles.fullScreenView}>

				{ loadingView }

				<View style={styles.formView}>

					{ selectButtons }

					<TextInput onChangeText={(email) => {this.setState({email:email})}} placeholder="Email или логин"/>
					<TextInput secureTextEntry={true} onChangeText={(password) => {this.setState({password:password})}} placeholder="Пароль"/>
					{
						this.state.selectForm == 'register' ? 
						<TextInput secureTextEntry={true} onChangeText={(repeatPassword) => {this.setState({repeatPassword:repeatPassword})}} placeholder="Повторите пароль"/>
						: <View></View>
					}
					{ buttonUserPress }

				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	loading:{
		position:'absolute',
		zIndex:9000,
		top:0,
		width:width,
		height:height,
		justifyContent:'center',
		alignItems:'center',
		left:0,
		backgroundColor:'rgba(255,255,255,0.7)'
	},
	buttonPressText:{
		color:'#fff'
	},
	buttonPress:{
		width:width-40,
		paddingTop:15,
		paddingBottom:15,
		backgroundColor:'#333',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:5
	},
	selectFormButton:{
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:5,
		width:(width-40)/2.2,
		paddingRight:5,
		textAlign:'center',
		borderRadius:5,
		color:'#fff',
		backgroundColor:'#444'
	},
	selectFormButtonActive:{
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:5,
		width:(width-40)/2.2,
		paddingRight:5,
		textAlign:'center',
		borderRadius:5,
		color:'#fff',
		backgroundColor:'orange'
	},
	selectFormUser:{
		flexDirection:'row',
		justifyContent:'space-between'
	},
	formView:{
		width:width-40,
		flexDirection:'column'
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
		justifyContent:'center',
		alignItems:'center'
	},
})

const mapStateToProps = (state) => {
	return{
		user:state.user,
		config:state.config
	}
}

const dispatchToProps = (dispatch) => {
	return {
		loginUser:()=>{

			const loginUser = () => {
				return dispatch({
					type:'LOGET_IN',
					logedin:true
				})
			}
			dispatch(loginUser())

		},
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
		loading:(status)=>{
			const loading = () => {
				return dispatch({
					type:'LOADING',
					loading:status,
				})
			}

			dispatch(loading())
		}
	}
}

export default connect(mapStateToProps, dispatchToProps)(FormLogin)