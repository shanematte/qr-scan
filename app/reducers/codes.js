const initialState = {
	barcode:'',
	typecode:'',
	codes:{
		date:'',
		barcodes:[],
		description:''
	},
	cameraStatus:false,
	codeArchive:[],
	statusScan:0
}

const scanCodes = (state = initialState, action) => {

	switch(action.type){

		case 'STATUS_SCANNING' :
			return {
				...state,
				statusScan:action.statusScan
			}

		case 'INSERT_CODE' :
			return {
				...state,
				codes:{
					date:action.date,
					barcodes:action.codes,
					description:action.description
				}
			}

		case 'CAMERA_STATUS' :
			return {
				...state,
				cameraStatus:action.cameraStatus
			}

		case 'INSERT_CODE_ARCHIVE' :
			return {
				...state,
				codeArchive:action.codeArchive
			}

		case 'REMOVE_CODE_ARCHIVE' :
			return {
				...state,
				codeArchive:[]
			}

		case 'CLEAR_CODE' :
			return {
				...state,
				codes:{
					date:'',
					barcodes:[],
					description:''
				},
				barcode:'',
				typecode:''
			}

		case 'UPDATE_BARCODE' :
			return {
				...state,
				barcode:action.barcode,
				typecode:action.typecode
			}	

		default :
			return state

	}

}

export default scanCodes