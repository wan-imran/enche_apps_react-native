import * as types from '../types'

const initialState = {
	data: [],
	loading: false,
	error: false,
	errorMessage: ''
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_PRODUCTS_FEATURED:
			return {
				...state,
				loading: true,
				data: []
			}
		case types.FETCH_PRODUCTS_FEATURED_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.data,
				error: false,
				errorMessage: ''
			}
		case types.FETCH_PRODUCTS_FEATURED_FALIED:
			return {
				...state,
				loading: false,
				data: [],
				error: true,
				errorMessage: action.error
			}
		default:
			return state
	}
}

export default reducer