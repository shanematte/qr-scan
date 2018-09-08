import React, { Component } from 'react'
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	ScrollView,
	ToastAndroid,
	TextInput,
	TouchableHighlight,
	Image
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { NavigationActions } from 'react-navigation'
import 'moment/locale/ru'

const { width, height } = Dimensions.get('window')

class PreviewScan extends Component {

	constructor(props){
		super(props)

		this.state = {
			description:''
		}

	}

	openDrawerButton(){
		
		this.props.statusScanChange(0)
		this.props.cameraStatus(true)
		this.props.navigation.goBack()

	}

	getInsertCodeCodeInArchive(){
		moment.locale('ru')
		let code = this.props.codes.codes
		let description = this.state.description
		let archive = this.props.codes.codeArchive
		//moment().format('MMMM Do YYYY').add(5, 'days')
		//moment().add(1, 'days').format("MMMM Do YYYY")

		if(code.barcodes.length > 0){

			archive.push({
				date:moment().format('DD.MM.YYYY'),
				detailDate:code.date,
				description:description,
				barcodes:code.barcodes
			})
			
			this.props.insertCodeArchive(archive)
			this.props.clearCode()
			this.props.statusScanChange(0)
			
			const resetAction = NavigationActions.reset({
			  index: 0,
			  actions: [
			    NavigationActions.navigate({ routeName: 'appRoutes'})
			  ]
			})
			this.props.navigation.dispatch(resetAction)

		}else{

			ToastAndroid.show('Необходимо сканировать ID животного', ToastAndroid.SHORT)

		}


	}

	getResetCodes(){

		this.props.clearCode()
		this.props.statusScanChange(0)

	}

	statusScanChange(status){

		this.props.cameraStatus(true)
		this.props.statusScanChange(status)
		this.props.navigation.goBack()

	}

	render(){

		const codes = this.props.codes.codes

		return(

			<View style={styles.fullScreenView}>
				
				<View style={styles.bgImage}>
					<View style={styles.bgNavColor}></View>
					<Image style={styles.bgNav} source={require('../media/nav.jpg')}/>
				</View>
				<View style={styles.contentNavigation}>

					<View style={styles.iconNavView}>
						<Text style={styles.textHeaderBack} onPress={this.openDrawerButton.bind(this)}>
							<FontAwesome>
								
								{ Icons.arrowLeft }
								
							</FontAwesome>
						</Text>
						<Text style={styles.textHeader}>Результат</Text>
					</View>

					<View style={styles.mainView}>
						<Text style={styles.mainDateText}><FontAwesome>{ Icons.calendarO }</FontAwesome> Дата: { codes.date ? codes.date : '- - - -' }</Text>
						<View style={styles.viewCodesList}>
							<View style={styles.secondViewCodesMain}>
								<TouchableHighlight onPress={this.statusScanChange.bind(this, 1)} underlayColor="white">
									<View>
										<Text style={styles.textMaincode}>ID животного</Text>
										<Text>{ codes.barcodes[0] ? codes.barcodes[0] : '- - - -' }</Text>	
									</View>
								</TouchableHighlight>
							</View>
							<View style={styles.secondViewCodes}>
								<View style={styles.secondViewCodesLeft}>
									<TouchableHighlight onPress={this.statusScanChange.bind(this, 2)} underlayColor="white">
										<View>
											<Text style={styles.textMaincode}>Биоматериал</Text>
											<Text>{ codes.barcodes[1] ? codes.barcodes[1] : '- - - -' }</Text>
										</View>
									</TouchableHighlight>
								</View>
								<View style={styles.secondViewCodesRight}>
									<TouchableHighlight onPress={this.statusScanChange.bind(this, 3)} underlayColor="white">
										<View>
											<Text style={styles.textMaincode}>Препарат</Text>
											<Text>{ codes.barcodes[2] ? codes.barcodes[2] : '- - - -' }</Text>
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
						<View>
							<TextInput onChangeText={(description)=>{this.setState({description:description})}} placeholder="Примечание"/>
						</View>
						<View style={styles.buttonsView}>
							{

								this.props.codes.codes.barcodes.length < 3 ?
									<TouchableHighlight onPress={this.statusScanChange.bind(this, 0)} underlayColor="white">
										<View style={styles.buttonMain}>
											<FontAwesome style={styles.barcode}>{ Icons.barcode }</FontAwesome>
											<Text style={styles.textButton}>СКАНИРОВАТЬ ЕЩЕ</Text>
										</View>
									</TouchableHighlight>
								: <View></View>
								
							}

							<TouchableHighlight onPress={this.getInsertCodeCodeInArchive.bind(this)} underlayColor="white">
								<View style={styles.buttonMain}>
									<FontAwesome style={styles.timesCircle}>{ Icons.check }</FontAwesome>
									<Text style={styles.textButton}>ЗАВЕРШИТЬ</Text>
								</View>
							</TouchableHighlight>

							<TouchableHighlight onPress={this.getResetCodes.bind(this)} underlayColor="white">
								<View style={styles.buttonMain}>
									<FontAwesome style={styles.removeIcon}>{ Icons.trash }</FontAwesome>
									<Text style={styles.textButton}>ОЧИСТИТЬ</Text>
								</View>
							</TouchableHighlight>

						</View>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
	removeIcon:{
		color:'red'
	},
	timesCircle:{
		fontSize:22,
		color:'green'
	},
	mainDateText:{
		textAlign:'center'
	},
	barcode:{
		fontSize:22
	},
	secondViewCodesMain:{
		justifyContent:'center',
		alignItems:'center',
		padding:7,
		backgroundColor:'rgba(rgba(255,255,255,0.8))',
		borderRadius:8
	},
	secondViewCodes:{
		color:'#000',
		fontSize:14
	},
	secondViewCodesLeft:{
		marginRight:15,
		justifyContent:'center',
		alignItems:'center',
		padding:7,
		backgroundColor:'rgba(rgba(255,255,255,0.8))',
		borderRadius:8
	},
	secondViewCodesRight:{
		justifyContent:'center',
		alignItems:'center',
		padding:7,
		backgroundColor:'rgba(rgba(255,255,255,0.8))',
		borderRadius:8
	},
	secondViewCodes:{
		flexDirection:'row',
		marginTop:20
	},
	textButton:{
		marginTop:5,
		fontSize:11
	},
	buttonMain:{
		width:(width/2)-40,
		height:60,
		justifyContent:'center',
		alignItems:'center',
		marginLeft:10,
		marginRight:10,
		marginTop:10,
		marginBottom:10,
		backgroundColor:'#eee',
		borderRadius:5
	},
	buttonsView:{
		flexWrap:'wrap',
		flexDirection:'row',
		justifyContent:'space-between'
	},
	textCodeList:{
		fontWeight:'bold',
		fontSize:19
	},
	viewCodesList:{
		width:width-20,
		height:height/3,
		marginTop:10,
		marginBottom:10,
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:10,
		paddingRight:10,
		backgroundColor:'rgba(0,0,0,0.06)',
		borderRadius:7,
		justifyContent:'center',
		alignItems:'center'
	},
	textHeaderBack:{
		paddingLeft:10,
		paddingTop:5,
		paddingRight:10,
		paddingBottom:10,
		fontSize:30
	},
	textHeader:{
		paddingLeft:10,
		paddingTop:5,
		paddingRight:10,
		paddingBottom:10,
		fontSize:20
	},
	headerView:{
		width:width,
		height:70,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	iconNavView:{
		position:'absolute',
		top:0,
		left:0,
		zIndex:100000,
		width:width,
		height:70,
		justifyContent:'space-between',
		flexDirection:'row'
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
		height:height,
		paddingTop:40,
		paddingLeft:10,
		paddingRight:10,
		paddingBottom:0
	}
})

const mapStateToProps = (state) => {
	return{
		codes:state.codes
	}
}

const dispatchToProps = (dispatch) => {
	return {
		insertCodeArchive: (codeArchive) => {

			dispatch({
				type:'INSERT_CODE_ARCHIVE',
				codeArchive:codeArchive
			})

		},
		statusScanChange: (status) => {

			dispatch({
				type:'STATUS_SCANNING',
				statusScan:status
			})

		},
		clearCode: () => {

			dispatch({
				type:'CLEAR_CODE'
			})

		},
		cameraStatus:(status)=>{

			dispatch({
				type:'CAMERA_STATUS',
				cameraStatus:status
			})

		}
	}
}

export default connect(mapStateToProps, dispatchToProps)(PreviewScan)