import feathers from 'feathers-client'
import io from 'socket.io-client'
import authentication from 'feathers-authentication-client'

import {
	AsignStorage
} from 'react-native'

const host = 'http://188.225.73.109/';
let socket = io(host, { transports: ['websocket'] });

const api = feathers()
			.configure(feathers.socketio(socket))
			.configure(feathers.hooks())
			.configure(authentication({ storage: AsignStorage }))

export default api
