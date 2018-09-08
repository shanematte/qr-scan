import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Alert,
	TextInput,
	Dimensions,
	ToastAndroid,
	TouchableHighlight
} from 'react-native'
import _ from 'underscore'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import api from '../config/feathers'
import axios from 'axios'

const { width, height } = Dimensions.get('window')
const serverIp = 'http://188.225.73.109'

class SendToEmail extends Component {

	constructor(props){
		super(props)
		this.state = {
			generateCodes:false,
			dataCodes:[],
			linkcsv:'',
			namefile:'',
			email:'',
			description:'',
			statussend:false
		}
	}

	openDrawerButton(){

		this.props.navigation.goBack()

	}

	generateFile(){

		const generateCsvApi = api.service('generate-csv')

		let userId = this.props.user.user.id
		let that = this

		let arrayCsv = []
		let data = this.props.navigation.state.params.data
		let numberList = 0

		arrayCsv.push(data[0])
		let mainAllCodes = data[1]

		Object.keys(mainAllCodes).map((key)=>{
			numberList = numberList + 1
			arrayCsv.push([ numberList, mainAllCodes[key].detailDate, mainAllCodes[key].barcodes[0] ? mainAllCodes[key].barcodes[0] : '-', mainAllCodes[key].barcodes[1] ? mainAllCodes[key].barcodes[1] : '-', mainAllCodes[key].barcodes[2] ? mainAllCodes[key].barcodes[2] : '-', mainAllCodes[key].description  ? mainAllCodes[key].description : '-' ])

		})

		this.setState({
			generateCodes:true,
			dataCodes:arrayCsv
		})

		axios.post(serverIp+'/generate-file-csv', {
			data:arrayCsv,
			userid:userId
		}).then(({data})=>{

			that.setState({
				linkcsv:serverIp+'/'+data.link,
				namefile:data.name
			})

		}).catch((errcsv)=>{

			console.log(errcsv)

		})

	}

	sendEmailFile(){

		let that = this

		let { description, email, linkcsv, namefile } = this.state

		const r = new RegExp(/^([a-zA-Z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/)

		if (r.test(email)) {

			that.setState({
				statussend:true
			})

			axios.post(serverIp+'/send-to-email', {
				email:email,
				link:linkcsv,
				description:description,
				namefile:namefile
			}).then(({data})=>{

				console.log(data)

				if(data.success){

					ToastAndroid.show('Файл успешно отправлен на '+email, ToastAndroid.SHORT)

					that.props.navigation.goBack()

				}else{

					that.setState({
						statussend:false
					})

				}

			}).catch((err)=>{

				that.setState({
					statussend:false
				})

				console.log(err)

				ToastAndroid.show('Упс, что-то пошло не так, попробуйте еще раз', ToastAndroid.SHORT)

			})

		}else{

			ToastAndroid.show('Введите email', ToastAndroid.SHORT)

		}

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
							
							{ Icons.arrowLeft }
							
						</FontAwesome>
					</Text>

					<View style={styles.contentMainView}>

						<Text style={styles.contentMainViewTitle}>Отправить файл на почту</Text>
						<Text style={styles.contentMainViewTitle}>Нажмите сгенерировать файл</Text>

						{
							this.state.generateCodes ? 

									<View>
									    <Text style={styles.nameFileCsv}>{ this.state.namefile ? this.state.namefile : 'нет ссылки' }</Text>
									    <TextInput style={styles.textInputEmail} placeholder="Введите email" onChangeText={(email)=>{this.setState({email:email})}}/>
									    <TextInput style={styles.textInputEmail} keyboardType="email-address" placeholder="Примечание" onChangeText={(description)=>{this.setState({description:description})}}/>
									    {
									    	this.state.statussend ? <Text style={styles.nameFileCsv}>Подождите, идет отправка...</Text> : <Text></Text>
									    }
									    {
									    	this.state.statussend ? <Text></Text> : <Text style={styles.mainSendButton} onPress={this.sendEmailFile.bind(this)}>ОТПРАВИТЬ</Text>
									    }
									</View>

								:

									<View>
										<TouchableHighlight onPress={this.generateFile.bind(this)}>
											<Text style={styles.buttonText}>сгенерировать файл</Text>
										</TouchableHighlight>
									</View>
								

						}

					</View>

				</View>
			</View>
		)

	}

}

const styles = StyleSheet.create({
	mainSendButton:{
		padding:10,
		fontSize:17,
		backgroundColor:'#34a23c',
		color:'#fff',
		textAlign:'center'
	},
	textInputEmail:{
		width:width/1.5,
		height:50,
		marginBottom:10,
		color:'#333',
		fontSize:17
	},
	nameFileCsv:{
		padding:10,
		textAlign:'center',
		marginTop:7,
		marginBottom:7,
		backgroundColor:'rgba(0,0,0,0.1)'
	},
	buttonText:{
		padding:17,
		color:'#fff',
		fontSize:25,
		borderRadius:7,
		backgroundColor:'#71d831'
	},
	contentMainViewTitle:{
		fontSize:21
	},
	mainViewScroll:{
		width:width,
		height:height-160
	},
  	table: { 
  		width: width-20, 
  		flexDirection: 'row' 
  	},
  	head: { 
  		backgroundColor: '#333',
  		height: 40 
  	},
  	headText: { 
  		color: '#fff', 
  		textAlign: 'center' 
  	},
  	titleText: { 
  		marginLeft: 6
  	},
  	list: {
  		height: 48, 
  		backgroundColor: 'rgba(0,0,0,0.1)' 
  	},
  	listText:{
  		textAlign: 'center', 
  		marginRight: 6 
  	},
	text:{
		color:'#333'
	},
	bottomButtonsViewTitle:{
		flexDirection:'row'
	},
	buttonBottomText:{
		color:'#fff'
	},
	buttonBottomTextIcon:{
		position:'relative',
		top:3,
		color:'#fff'
	},
	buttonBottom:{
		width:(width/2)-20,
		marginLeft:10,
		marginRight:10,
		marginTop:15,
		height:40,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#56656a',
		borderRadius:5
	},
	bottomButtonsView:{
		flexDirection:'row',
		justifyContent:'space-between'
	},
	mainTextList:{
		padding:5,
		margin:5,
	},
	mainViewTitle:{
		marginBottom:20,
	},
	listScane:{
		width:width-20,
		height:50,
		flexDirection:'row',
		alignItems:'center',
		padding:5,
		borderWidth:1,
		borderColor:'rgba(0,0,0,0.4)',
		backgroundColor:'#eee',
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
	contentMainView:{
		width:width,
		height:height,
		paddingTop:50,
		paddingBottom:15,
		paddingLeft:10,
		paddingRight:10,
		justifyContent:'center',
		alignItems:'center'
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
		width:width,
		height:height-70,
		paddingTop:50,
		paddingLeft:10,
		paddingRight:10,
		paddingBottom:10
	},
	textHeader:{
		fontSize:20,
		color:'#e4256a'
	},
})


const mapStateToProps = (state) => {
	return{
		user:state.user,
		codes:state.codes
	}
}

const dispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, dispatchToProps)(SendToEmail)