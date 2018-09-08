import { combineReducers } from 'redux'
import scanCodes from './codes'
import user from './user'
import config from './config'

const reducers = (navReducers) => {

	return combineReducers({
		nav:navReducers,
		codes:scanCodes,
		config:config,
		user:user
	})

}

export default reducers