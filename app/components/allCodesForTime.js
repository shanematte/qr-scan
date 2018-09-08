import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	View,
	Text,
	StyleSheet,
	Vibration,
	Dimensions,
	ScrollView,
	Image,
	Alert,
	TouchableHighlight
} from 'react-native'
import _ from 'underscore'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import CameraScan from './scanCamera'
import Auth from './auth'

const { width, height } = Dimensions.get('window')

class AllCodesTime extends Component {

	fullPageCodeTime(key, date){
		this.props.navigator.navigate('listCodes',{
			keyCode:key,
			keyDate:date
		})
	}

	removeAllCode(){

		let that = this

		Alert.alert(
		  'Внимание',
		  'Вы действительно хотите удалить весь архив. Архив будет полностью очищен, без возможности восстановления',
		  [
		    {text: 'Удалить', onPress: () => {
		    	that.props.deletedAllArchive()
		    }},
		    {text: 'Отмена'},
		  ],
		  { cancelable: false }
		)

	}

	routeToScan(){
		this.props.navigator.navigate('Сканировать')
	}

	render(){

		let codes = this.props.codes.codeArchive
		let timeCodes = _.uniq(codes, 'date')

		timeCodes = _.sortBy(timeCodes, 'date').reverse()

		return(
			<View style={styles.fullScreenView}>

				<View style={styles.viewCalendarText}>
					<Text style={styles.textCalendar}>Список результатов</Text>
				</View>

				<View style={styles.viewTimeCodes}>
					<ScrollView>
						{
							timeCodes.length > 0 ?
								Object.keys(timeCodes).map((key, index)=>{
									return(
										<Text style={styles.mainDateButton} key={index} onPress={this.fullPageCodeTime.bind(this, key, timeCodes[key].date)} key={index}>
											<FontAwesome style={{margin:10}}>{ Icons.book }</FontAwesome>
											<Text> { timeCodes[key].date }</Text>
										</Text>
									)
								})
							: <View style={styles.viewNotArchive}>
								<Text>Архив пуст</Text>
								<TouchableHighlight style={styles.buttonScanRouteMain} onPress={this.routeToScan.bind(this)}>
									<Text style={{fontSize:17,color:'#fff',textAlign:'center'}}>Начать сканирование</Text>
								</TouchableHighlight>
							</View>
						}

					</ScrollView>
				</View>
				{
					timeCodes.length > 0 ?
						<TouchableHighlight onPress={this.removeAllCode.bind(this)} style={styles.removeAllCodes}>
							<Text style={styles.removeAllCodesText}>Очистить весь архив</Text>
						</TouchableHighlight>
					: <Text></Text>

				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	viewNotArchive:{
		width:width-20,
		height:height-100,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center'
	},
	removeAllCodesText:{
		color:'#fff'
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
	removeAllCodes:{
		width:width-20,
		height:40,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#b72d2d',
		borderRadius:5
	},
	mainDateButton:{
		padding:10,
		marginBottom:10,
		color:'rgba(0,0,0,0.6)',
		fontSize:20,
		backgroundColor:'#eee',
		borderRadius:7,
	},
	viewCalendarText:{
		flexDirection:'row',
		marginBottom:10,
		position:'absolute',
		top:15,
		right:10,
		fontSize:18
	},
	textCalendar:{
		fontSize:16,
		color:'rgba(0,0,0,0.5)'
	},
	viewTimeCodes:{
		width:width-20,
		height:height-100
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
		paddingTop:50,
		paddingLeft:10,
		paddingRight:10
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
		deletedAllArchive:()=>{
			console.log('deleted')
			const deletedAllArchive = () => {
				return dispatch({
					type:'REMOVE_CODE_ARCHIVE'
				})
			}
			dispatch(deletedAllArchive())
		}
	}
}

export default connect(mapStateToProps, dispatchToProps)(AllCodesTime)