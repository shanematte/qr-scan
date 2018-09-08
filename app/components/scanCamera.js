import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Vibration,
	Alert,
	TouchableHighlight,
	Button
} from 'react-native'
import Camera from 'react-native-camera'
import { connect } from 'react-redux'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import moment from 'moment'
import 'moment/locale/ru'

const { width, height } = Dimensions.get('window')

class CameraScan extends Component {

	constructor(props){
		super(props)

		this.state = {
		    torchMode: 'off',
		    cameraType: 'back',
		    barcode:'',
		    type:'',
		    isTorchOn:false
		}

	}

	componentDidMount(){

		let that = this

		setTimeout(()=>{
			that.props.cameraStatus(true)
		}, 700)

	}

	barcodeScanFinal(code){
		
		moment.locale('ru')

		let codexInfo = this.props.codes.statusScan

		if (code.data !== this.state.barcode || code.type !== this.state.type) {

			Vibration.vibrate()
			this.props.cameraStatus(false)
			let nowDate = moment().format('DD.MM.YYYY, h:mm:ss a')
			let barcode = code.data
			let barcodes = this.props.codes.codes.barcodes

			switch(codexInfo){

				case 1 :
					barcodes[0] = barcode
					this.props.insertCode(nowDate, barcodes)
					this.props.cameraStatus(false)
					this.props.statusScanChange
					return this.props.navigator.navigate('preview')

				case 2 :
					barcodes[1] = barcode
					this.props.insertCode(nowDate, barcodes)
					this.props.cameraStatus(false)
					this.props.statusScanChange
					return this.props.navigator.navigate('preview')

				case 3 :
					barcodes[2] = barcode
					this.props.insertCode(nowDate, barcodes)
					this.props.cameraStatus(false)
					this.props.statusScanChange
					return this.props.navigator.navigate('preview')

				default :
					barcodes.push(barcode)
					this.props.insertCode(nowDate, barcodes)
					this.props.cameraStatus(false)
					this.props.statusScanChange
					return this.props.navigator.navigate('preview')

			}



		}

	}

	testProp(){
		this.props.updateBarcode('code.data', 'data.type')
		return false
	}

	createScan(){

		moment.locale('ru')

		let codexInfo = this.props.codes.statusScan

		let nowDate = moment().format('DD.MM.YYYY, h:mm:ss a')
		let barcode = Math.random()
		let barcodes = this.props.codes.codes.barcodes

		switch(codexInfo){

			case 1 :
				barcodes[0] = barcode
				this.props.insertCode(nowDate, barcodes)
				this.props.cameraStatus(false)
				this.props.statusScanChange
				return this.props.navigator.navigate('preview')

			case 2 :
				barcodes[1] = barcode
				this.props.insertCode(nowDate, barcodes)
				this.props.cameraStatus(false)
				this.props.statusScanChange
				return this.props.navigator.navigate('preview')

			case 3 :
				barcodes[2] = barcode
				this.props.insertCode(nowDate, barcodes)
				this.props.cameraStatus(false)
				this.props.statusScanChange
				return this.props.navigator.navigate('preview')

			default :
				barcodes.push(barcode)
				this.props.insertCode(nowDate, barcodes)
				this.props.cameraStatus(false)
				this.props.statusScanChange
				return this.props.navigator.navigate('preview')

		}

		//console.log(this.props.navigator)

	}

	render(){

		let that = this

		let codes = this.props.codes

		let cameraView = this.props.codes.cameraStatus ? <Camera
					        onBarCodeRead={this.barcodeScanFinal.bind(this)}
					        style={{width:width,height:height/2}}
					        playSoundOnCapture={true}
					        torchMode={this.state.torchMode}
					        type={this.state.cameraType}
						/> : <View></View>

		let textTorch = this.state.isTorchOn == true ? 'Выключить фонарик' : 'Включить фонарик'

		/*
			<TouchableHighlight onPress={this.createScan.bind(this)}>
				<Text>create scan</Text>
			</TouchableHighlight>
		*/

		return(
			<View style={styles.mainView}>

				<View style={styles.scanViewCamera}>

					{
						cameraView
					}

				</View>
				<View style={styles.viewBottomCamera}>
					<Text style={styles.textBottomDescription}>Сфокусируйте камеру на штрих или qr коде</Text>
				</View>
				
			</View>
		)
	}	
}

const styles = StyleSheet.create({
	textBottomDescription:{
		width:width,
		padding:20,
		fontSize:19,
		textAlign:'center'
	},
	viewBottomCamera:{
		width:width,
		height:height/2,
		justifyContent:'center',
		alignItems:'center'
	},
	finalText:{
		textAlign:'center'
	},
	scanViewCamera:{
		width:width,
		marginTop:0,
		marginBottom:0,
		marginLeft:0,
		backgroundColor:'rgba(0,0,0,0.2)',
		marginRight:0,
		height:height/2,
		position:'relative',
		zIndex:1,
		justifyContent:'center',
		alignItems:'center'
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
		updateBarcode(barcode, type){
			dispatch({
				type:'UPDATE_BARCODE',
				barcode:barcode,
				typecode:type
			})
		},
		insertCode:(nowDate, barcodes)=>{

			dispatch({
				type:'INSERT_CODE',
				date:nowDate,
				codes:barcodes,
				description:''
			})

		},
		clearCodes:(nowDate, barcode)=>{

			dispatch({
				type:'CLEAR_CODE'
			})

		},
		statusScanChange: () => {

			dispatch({
				type:'STATUS_SCANNING',
				statusScan:0
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

export default connect(mapStateToProps, dispatchToProps)(CameraScan)