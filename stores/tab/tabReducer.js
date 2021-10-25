import * as tabActionTypes from './tabActions'

const initiatState = {
    isTradeModalVisible : false
}

const tabReducer = (state = initiatState, action) => {
    switch (action.type) {
        case tabActionTypes.SET_TRADE_MODAL_VISIBILITY:
            return {
                ...state,
                isTradeModalVisible: action.payload.isVisible
            }
        default:
            return state
    }
}

export default tabReducer