import { combineReducers } from "redux"
import {
    getLiveLotsListReducer, getSoldLotsListReducer, getExpiredLotsListReducer, getLotsListReducer,
    getUpCommingLotsListReducer, loginUserDetailsReducer, getLotDetailsReducer, newBidOnLotReducer,
    getCustimerWinLotsReducer, getCustimerParticipateLotsReducer, getCustomerBalanceReducer,
    participateInLotReducer, participoteOnExpireLotReducer, getCategoriesReducer, requestAtivateAccountReducer
} from './AuctopnReducer'

export const MainReducer = combineReducers({
    getLiveLotsListReducer, getSoldLotsListReducer, getExpiredLotsListReducer, getLotsListReducer,
    getUpCommingLotsListReducer, loginUserDetailsReducer, getLotDetailsReducer, newBidOnLotReducer,
    getCustimerWinLotsReducer, getCustimerParticipateLotsReducer, getCustomerBalanceReducer,
    participateInLotReducer, participoteOnExpireLotReducer, getCategoriesReducer, requestAtivateAccountReducer

})
