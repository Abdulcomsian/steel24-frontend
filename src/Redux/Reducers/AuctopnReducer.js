// import { STATUS_CODES } from 'http'
import Constants from '../Constants'

export const getLiveLotsListReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_LIVE_LOTS_LIST_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_LIVE_LOTS_LIST_SUCESS: {
            return { ...state, liveLotsList: action.data.data, Loading: false }
        }
        case Constants.GET_LIVE_LOTS_LIST_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getSoldLotsListReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_SOLD_LOTS_LIST_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_SOLD_LOTS_LIST_SUCESS: {
            return { ...state, soldLotsList: action.data.lotList, Loading: false }
        }
        case Constants.GET_SOLD_LOTS_LIST_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getExpiredLotsListReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_EXPIRED_LOTS_LIST_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_EXPIRED_LOTS_LIST_SUCESS: {
            return { ...state, expiredLotsList: action.data.lotList, Loading: false }
        }
        case Constants.GET_EXPIRED_LOTS_LIST_FAILED: {
            return { ...state, Error: action.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getLotsListReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_LOTS_LIST_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_LOTS_LIST_SUCESS: {
            return { ...state, lotsList: action.data.lots, Loading: false }
        }
        case Constants.GET_LOTS_LIST_FAILED: {
            return { ...state, Error: action, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getUpCommingLotsListReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_UPCOMMING_LOTS_LIST_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_UPCOMMING_LOTS_LIST_SUCESS: {
            return { ...state, upCommingLotsList: action.data, Loading: false }
        }
        case Constants.GET_UPCOMMING_LOTS_LIST_FAILED: {
            return { ...state, Error: action, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getLotDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_LOTS_DETAILS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_LOTS_DETAILS_SUCESS: {
            return { ...state, lotDeatils: action.data, Loading: false }
        }
        case Constants.GET_LOTS_DETAILS_FAILED: {
            return { ...state, Error: action, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const newBidOnLotReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.NEW_BID_ON_LOT_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.NEW_BID_ON_LOT_SUCESS: {
            return { ...state, bidDetails: action.data, Loading: false }
        }
        case Constants.NEW_BID_ON_LOT_FAILED: {
            return { ...state, Error: action, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getCustimerWinLotsReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_CUSTOMER_WIN_LOTS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_CUSTOMER_WIN_LOTS_SUCESS: {
            return { ...state, customerWinLots: action.data.lots, Loading: false }
        }
        case Constants.GET_CUSTOMER_WIN_LOTS_FAILED: {
            return { ...state, Error: action, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getCustimerParticipateLotsReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_CUSTOMER_PARTICIPATED_LOTS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_CUSTOMER_PARTICIPATED_LOTS_SUCESS: {
            return { ...state, customerParticipateLots: action.data.lots, Loading: false }
        }
        case Constants.GET_CUSTOMER_PARTICIPATED_LOTS_FAILED: {
            return { ...state, Error: action, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getCustomerBalanceReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_CUSTOMER_BALANCE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_CUSTOMER_BALANCE_SUCESS: {
            return { ...state, customerBalance: action.data, Loading: false }
        }
        case Constants.GET_CUSTOMER_BALANCE_FAILED: {
            return { ...state, Error: action, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const participateInLotReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.PARTICIPATE_IN_LOT_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.PARTICIPATE_IN_LOT_SUCESS: {
            return { ...state, participateInLot: action.data.data, Loading: false }
        }
        case Constants.PARTICIPATE_IN_LOT_FAILED: {

            return { ...state, Error: action.data.data, Loading: false }
        }
        case Constants.CLEAR_PARTICIPATE_IN_LOT_STATE: {
            return { ...state, Error: null, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const participoteOnExpireLotReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.PARTICIPATE_IN_EXPIRE_LOT_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.PARTICIPATE_IN_EXPIRE_LOT_SUCESS: {
            return { ...state, participoteOnExpireLot: action.data.data, Loading: false }
        }
        case Constants.PARTICIPATE_IN_EXPIRE_LOT_FAILED: {
            return { ...state, Error: action.data.data, Loading: false }
        }
        case Constants.CLEAR_PARTICIPATE_IN_EXPIRE_LOT_STATE: {
            return { ...state, Error: null, Loading: false }
        }
        default:
            return { ...state }
    }
}

export const getCategoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.GET_LOTS_CATEGORIES_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_LOTS_CATEGORIES_SUCESS: {

            return { ...state, categoriList: action.data.categoriList, Loading: false }
        }
        case Constants.GET_LOTS_CATEGORIES_FAILED: {
            return { ...state, Error: action.data.data, Loading: false }
        }
        default:
            return { ...state }
    }
}


export const requestAtivateAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case Constants.ACTIVATE_ACCOUNT_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.ACTIVATE_ACCOUNT_SUCESS: {
            return { ...state, requestStatus: action.data, Loading: false }
        }
        case Constants.ACTIVATE_ACCOUNT_FAILED: {
            return { ...state, Error: action.data.data, Loading: false }
        }
        default:
            return { ...state }
    }
}

// User Reducer
export const loginUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        // SIGNUP
        case Constants.USER_SIGNUP_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.USER_SIGNUP_SUCESS: {
            return { ...state, loginUserDetails: action.data.data.result, Loading: false }
        }
        case Constants.USER_SIGNUP_FAILED: {
            return { ...state, Error: action.data.data, Loading: false }
        }

        // LOGIN WITH GOOGLE
        case Constants.USER_LOGIN_WITH_GOOGLE_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.USER_LOGIN_WITH_GOOGLE_SUCESS: {
            return { ...state, loginUserDetails: action.data.data.result, Loading: false }
        }
        case Constants.USER_LOGIN_WITH_GOOGLE_FAILED: {
            return { ...state, Error: action.data.data, Loading: false }
        }

        // LOGIN
        case Constants.USER_LOGIN_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.USER_LOGIN_SUCESS: {
            localStorage.setItem('UserDetails', JSON.stringify(action.data.data.result[0]));
            localStorage.setItem('token', action.data.data.token);
            return { ...state, loginUserDetails: action.data.data.result[0], Loading: false }
        }
        case Constants.USER_LOGIN_FAILED: {
            return { ...state, Error: action.data.data, Loading: false }
        }


        // GET USER DETAILS
        case Constants.GET_USER_DETAILS_REQUEST: {
            return { ...state, Loading: true }
        }
        case Constants.GET_USER_DETAILS_SUCESS: {
            return { ...state, loginUserDetails: action.data.user, Loading: false }
        }
        case Constants.GET_USER_DETAILS_FAILED: {
            return { ...state, Error: action.data.data, Loading: false }
        }

        // USER DETAILS UPDATE
        case Constants.USER_DETAILS_UPDATE_REQUEST: {
            return { ...state, Loading: true, update: true }
        }
        case Constants.USER_DETAILS_UPDATE_SUCESS: {
            return { ...state, loginUserDetails: action.data.data.result, update: false, Loading: false }
        }
        case Constants.USER_DETAILS_UPDATE_FAILED: {
            return { ...state, Error: action.data.data, Loading: false, update: true }
        }

        // LOGOUT
        case Constants.USER_LOG_OUT: {
            return { ...state, loginUserDetails: null, Loading: false }
        }

        case Constants.USER_ALLRADY_LOGIN: {
            return { ...state, loginUserDetails: action.data, Loading: false }
        }

        default:
            return { ...state }
    }
}

