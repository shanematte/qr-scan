import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	Dimensions,
	TouchableHighlight
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'

const { width, height } = Dimensions.get('window')

class About extends Component {

	openDrawerButton(){

		this.props.navigation.goBack()

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

					<View style={styles.mainView}>
						<ScrollView>
							<Text style={styles.textHeader}>О программе</Text>
							<Text style={styles.textMainAbout}>Компания ZTOWN Development является производителем и поставщиком изделий ветеринарного назначения на казахстанском рынке. Мы сотрудничаем с признанными мировыми производителями сырья, используемого в ветеринарных изделиях и зарекомендовали себя, как надежные партнеры. Наша компания работает со своими клиентами, повышает уровень сервиса и обеспечивает своевременную поставку изделий ветеринарного назначения. Мы динамично развиваемся, расширяем рынок сбыта и круг своих партнеров. ZTOWN Development это стремительно развивающаяся компания с успешной работой на рынке систем забора крови в области ветеринарии, а также идентификации сельскохозяйственных животных. На сегодняшний день изделия для идентификации сельскохозяйственных животных, поставляемые на рынок нашей компанией, имеют регистрацию в Международном комитете по ведению записей о животных, а системы забора крови собственного производства имеют сертификат  формы «СТ-КZ» подтверждающий происхождение товара на территории Республики Казахстан. Мы сотрудничаем с государственными лабораториями по всем регионам Республики Казахстана и зарекомендовали себя, как один из лучших по качеству отечественных производителей со сплоченной командой профессионалов. Наши изделия отличаются большой функциональностью, удобством использования, высоким качеством, надёжностью и долговечностью.</Text>
							<Text style={styles.textMainAbout}>Наши специалисты помогут подобрать необходимые вам ветеринарные изделия и организуют их своевременную доставку.</Text>
							<Text style={styles.textMainAbout}>Мы открываем новые пути к повышению качества ветеринарных услуг и уровня здравоохранения в целом.</Text>
							<Text style={styles.textMainAbout}>Главное отличие ZTOWN Development от других производителей изделий ветеринарного назначения – это сочетание уникальных инновационных продуктов и комплексного подхода к проблемам здравоохранения, в основе которого – внимание и забота о здоровье людей и животных.</Text>
							<Text style={styles.textMainAbout}>Наши достижения – это ваши преимущества.</Text>
						</ScrollView>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	textMainAbout:{
		marginBottom:5,
		fontSize:18,
		padding:5,
		backgroundColor:'rgba(0,0,0,0.1)',
		marginBottom:5,
		borderRadius:8
	},
	buttonScanRouteText:{
		color:'#fff',
		fontSize:22
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
		paddingTop:50,
		paddingBottom:10,
		paddingRight:10,
		paddingLeft:10
	},
	textHeader:{
		fontSize:20,
		color:'#e4256a'
	},
})

const mapStateToProps = (state) => {
	return{
		state:state
	}
}

const dispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, dispatchToProps)(About)