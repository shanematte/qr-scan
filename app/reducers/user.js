const initialState = {
	token:'',
	logedin:false,
	user:{
		email:''
	},
	saveCodesOnServer:[]
}

const user = (state = initialState, action) => {

	switch(action.type){

		case "UPDATE_TOKEN" :
			return {
				...state,
				token:action.token
			}

		case "LOGET_IN" :
			return {
				...state,
				logedin:action.logedin
			}

		case "UPDATE_USER" :
			return {
				...state,
				user:action.user,
				token:action.token,
				logedin:action.logedin
			}

		default :
			return state

	}

}

export default user