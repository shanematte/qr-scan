import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Alert,
	Dimensions,
	TouchableHighlight,
	ToastAndroid
} from 'react-native'
import _ from 'underscore'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import api from '../config/feathers'

const { width, height } = Dimensions.get('window')

class PageTimeCodes extends Component {

	openDrawerButton(){

		this.props.navigation.goBack()

	}

	saveToServer(){

		let mainArray = new Array()

		const serviceCodes = api.service('qrscannings')
		let token = this.props.user.token
		let user = this.props.user.user
		console.log(user.id)
		if(user.id){

			let keyCode = this.props.navigation.state.params.keyCode
			let keyDate = this.props.navigation.state.params.keyDate

			let codes = this.props.codes.codeArchive


			let arrayCsv = []
			let data = this.props.navigation.state.params.data
			let numberList = 0

			arrayCsv.push(['Номер', 'Время и дата', 'Идентификационный номер животного', 'Номер сосуда биоматериала', 'Номер сосуда препарата', 'Примечание'])
			let mainAllCodes = _.where(codes, {date: keyDate})

			Object.keys(mainAllCodes).map((key)=>{
				numberList = numberList + 1
				arrayCsv.push([ numberList, mainAllCodes[key].detailDate, mainAllCodes[key].barcodes[0] ? mainAllCodes[key].barcodes[0] : '-', mainAllCodes[key].barcodes[1] ? mainAllCodes[key].barcodes[1] : '-', mainAllCodes[key].barcodes[2] ? mainAllCodes[key].barcodes[2] : '-', mainAllCodes[key].description  ? mainAllCodes[key].description : '-' ])

			})

			serviceCodes.find({
				query:{
					"user_id":user.id,
					"create_date_scan":keyDate
				}
			}).then(({data})=>{
				if(data.length > 0){

					serviceCodes.patch(data.id, {
						'accessToken':token,
						'qrcodes':arrayCsv,
						'user_id':user.id,
						'create_date_scan':keyDate
					}).then(()=>{
						Alert.alert('Сообщение','Данные успешно обновлены')
					}).catch((err)=>{
						Alert.alert('Сообщение','Ошибка при сохранении, попробуйте еще раз')
					})

				}else{

					serviceCodes.create({
						'accessToken':token,
						'qrcodes':arrayCsv,
						'user_id':user.id,
						'create_date_scan':keyDate
					}).then(()=>{
						Alert.alert('Сообщение','Данные успешно сохранены на сервере')
					}).catch((err)=>{
						Alert.alert('Сообщение','Ошибка при сохранении, попробуйте еще раз')
					})

				}
			}).catch((errCodes)=>{
				Alert.alert('Ошибка', 'Ошибка на сервере, попробуйте еще раз, если не сработает обратитесь к администратору')
			})

			console.info(arrayCsv)

		}else{

			ToastAndroid.show('Для данного действия необходимо авторизоваться', ToastAndroid.SHORT)

		}

	}

	sendToEmailButton(){

		let mainArray = new Array()

		let keyCode = this.props.navigation.state.params.keyCode
		let keyDate = this.props.navigation.state.params.keyDate

		let codes = this.props.codes.codeArchive
		let timeCodesAll = _.where(codes, {date: keyDate})
		let tableHeadSave = ['Номер', 'Время и дата', 'Идентификационный номер животного', 'Номер сосуда биоматериала', 'Номер сосуда препарата', 'Примечание']

		mainArray.push(['Номер', 'Время и дата', 'Идентификационный номер животного', 'Номер сосуда биоматериала', 'Номер сосуда препарата', 'Примечание'])
		mainArray.push(timeCodesAll)

		return this.props.navigation.navigate('Отправить на почту', {
			data:mainArray
		})
	}

	render(){

		let keyCode = this.props.navigation.state.params.keyCode
		let keyDate = this.props.navigation.state.params.keyDate

		let codes = this.props.codes.codeArchive
		let timeCodesAll = _.where(codes, {date: keyDate})
		let numberList = 0

	    const tableHead = ['Номер', 'Время и дата', 'Идентификационный номер животного', 'Номер сосуда биоматериала', 'Номер сосуда препарата', 'Примечание']
	    const tableData = []
	    const widthArr = [60, 260, 250, 200, 200, 250]

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

					<View style={styles.mainView}>

						<Text style={styles.mainViewTitle}>Результат за { keyDate }</Text>

				      	<View style={styles.mainViewScroll}>

					        	<Table style={styles.table}>
					          		<ScrollView horizontal={true}>
					          			<TableWrapper style={{flexDirection:'column'}}>
						            		<TableWrapper borderStyle={{borderWidth: 1,borderColor: '#000'}}>
						              			<Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr}/>
						            		</TableWrapper>

						            		<ScrollView>
							            		<TableWrapper borderStyle={{borderWidth: 1,borderColor: '#000'}}>
							              			{
													    Object.keys(timeCodesAll).map((key, index)=>{

													    	numberList = numberList + 1

													    	return <Row key={index} data={[
													    		numberList, 
													    		timeCodesAll[key].detailDate, 
													    		timeCodesAll[key].barcodes[0], 
													    		timeCodesAll[key].barcodes[1], 
													    		timeCodesAll[key].barcodes[2], 
													    		timeCodesAll[key].description
													    	]} 
													    	style={[styles.list, index%2 && { backgroundColor: 'rgba(255,255,255,0.4)'}]} widthArr={widthArr} textStyle={styles.listText}/>

													    })
													}
													
							            		</TableWrapper>
						            		</ScrollView>
					            		</TableWrapper>
					          		</ScrollView>
					        	</Table>
				      	</View>

					</View>

					<View style={styles.bottomButtonsView}>
						<TouchableHighlight style={styles.buttonBottom} onPress={this.saveToServer.bind(this)}>
							<View style={styles.bottomButtonsViewTitle}>
								<FontAwesome style={styles.buttonBottomTextIcon}>{ Icons.server }</FontAwesome>
								<Text style={styles.buttonBottomText}> НА СЕРВЕР</Text>
							</View>
						</TouchableHighlight>
						<TouchableHighlight style={styles.buttonBottom} onPress={this.sendToEmailButton.bind(this)} >
							<View style={styles.bottomButtonsViewTitle}>
								<FontAwesome style={styles.buttonBottomTextIcon}>{ Icons.envelope }</FontAwesome>
								<Text style={styles.buttonBottomText}> НА ПОЧТУ</Text>
							</View>
						</TouchableHighlight>
					</View>

				</View>
			</View>
		)

	}

}

const styles = StyleSheet.create({
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
		marginBottom:10,
		fontSize:20
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

export default connect(mapStateToProps, dispatchToProps)(PageTimeCodes)