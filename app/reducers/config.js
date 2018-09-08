const initialState = {
	loading:false
}

const config = (state = initialState, action) => {

	switch(action.type){

		case "LOADING" :
			return {
				...state,
				loading:action.loading
			}

		default :
			return state

	}

}

export default config