import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Dimensions
} from 'react-native'
import { DrawerItems } from 'react-navigation'

const { width, height } = Dimensions.get('window')

class DrawerComponent extends Component {

	navigateProfileUser(){
		this.props.navigateMain.navigation.navigate('Профиль')
	}

	render(){

		const navigation = this.props.navigateMain
		const user = this.props.user
		const textLoggedIn = user.logedin == true ? <Text>{ user.user.email }</Text> : <Text>Вы не авторизованы</Text>

		return(
			<View style={styles.mainBlock}>
				<View style={styles.bgImage}>
					<Image style={styles.bgNav} source={require('../media/nav.jpg')}/>
				</View>
				<View style={styles.contentNavigation}>
					<View style={styles.bgHeaderNav}>
						<View style={styles.viewHeadDrawer}>
							<Image style={styles.viewHeadDrawerImage} source={require('../media/logo.png')}/>
						</View>
						<Text style={styles.loginName}>{ textLoggedIn }</Text>
					</View>
					<ScrollView>
						<DrawerItems {...navigation} />
					</ScrollView>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	loginName:{
		fontSize:24,
		color:'pink'
	},
	viewHeadDrawerImage:{
		width:width/1.5,
		height:90,
		resizeMode:'contain'
	},
	viewHeadDrawer:{
		width:width/1.3,
		height:100,
		justifyContent:'center',
		alignItems:'center'
	},
	textHeader:{
		fontSize:20,
		color:'#e4256a'
	},
	bgHeaderNav:{
		width:width/1.3,
		height:140,
		marginBottom:15,
		backgroundColor:'rgba(255,255,255,0.57)',
		justifyContent:'center',
		alignItems:'center',
		borderBottomColor: 'rgba(0,0,0,0.1)',
		borderBottomWidth: 2,
	},
	bgNav:{
		width:width,
		height:height,
		resizeMode:'cover'
	},
	bgImage:{
		position:'absolute',
		top:0,
		left:0,
		height:height,
		width:width/1.3,
		zIndex:1
	},
	contentNavigation:{
		position:'absolute',
		top:0,
		left:0,
		height:height,
		width:width/1.3,
		zIndex:100
	},
	mainBlock:{
		height:height,
		flex:1,
		position:'relative',
	}
})

const mapStateToProps = (state) => {
	return{
		state:state,
		user:state.user
	}
}

const dispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, dispatchToProps)(DrawerComponent)