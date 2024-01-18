import { Services } from "./Services"
import Constants from "../Constants"

// User Actions Start
const signUpAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.USER_SIGNUP_REQUEST, })
        Services.postService('auth/signUp', details).then(
            (response) => {
                if (response == 401) {
                    logOutAction();
                }
                else if (response?.data?.sucess) {
                    localStorage.setItem('UserDetails', JSON.stringify(response.data.result));
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("LoginDate", new Date().toLocaleDateString());
                    return Dispatch({ type: Constants.USER_SIGNUP_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.USER_SIGNUP_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.USER_SIGNUP_FAILED, data: error }) }
        )
    }
}
const loginWithGoogleAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.USER_LOGIN_WITH_GOOGLE_REQUEST, })
        Services.postService('auth/loginWithGoolge', details).then(
            (response) => {
                if (response == 401) {
                    logOutAction();
                }
                else if (response?.data?.sucess) {
                    localStorage.setItem('UserDetails', JSON.stringify(response.data.result));
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("LoginDate", new Date().toLocaleDateString());
                    return Dispatch({ type: Constants.USER_LOGIN_WITH_GOOGLE_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.USER_LOGIN_WITH_GOOGLE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.USER_LOGIN_WITH_GOOGLE_FAILED, data: error }) }
        )
    }
}

const loginAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.USER_LOGIN_REQUEST, })
        Services.postService('auth/login', details).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response?.data?.sucess) {
                    localStorage.setItem('UserDetails', JSON.stringify(response.data.result[0]));
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("LoginDate", new Date().toLocaleDateString());

                    return Dispatch({ type: Constants.USER_LOGIN_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.USER_LOGIN_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.USER_LOGIN_FAILED, data: error }) }
        )
    }
}

const isAllradyLoginAction = (details) => {
    return (Dispatch) => {
        return Dispatch({ type: Constants.USER_ALLRADY_LOGIN, data: details })
    }
}

const logOutAction = () => {
    localStorage.clear();
    return (Dispatch) => {
        return Dispatch({ type: Constants.USER_LOG_OUT, data: null })
    }
}

const userDetailsUpdateAction = (userId, details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.USER_DETAILS_UPDATE_REQUEST, })
        Services.postService('auth/updateUser/' + userId, details).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response.status) {
                    localStorage.setItem('UserDetails', JSON.stringify(response.data.result));
                    return Dispatch({ type: Constants.USER_DETAILS_UPDATE_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.USER_DETAILS_UPDATE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.USER_DETAILS_UPDATE_FAILED, data: error }) }
        )
    }
}

const getUserDetailsAction = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_USER_DETAILS_REQUEST, })
        Services.getService('user').then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response.user) {
                    localStorage.setItem('UserDetails', JSON.stringify(response.user));
                    return Dispatch({ type: Constants.GET_USER_DETAILS_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.GET_USER_DETAILS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_USER_DETAILS_FAILED, data: error }) }
        )
    }
}
const requestAtivateAccount = (userId) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ACTIVATE_ACCOUNT_REQUEST, })
        Services.getService('requestativateaccount/' + userId).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response.sucess) {
                    return Dispatch({ type: Constants.ACTIVATE_ACCOUNT_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.ACTIVATE_ACCOUNT_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ACTIVATE_ACCOUNT_FAILED, data: error }) }
        )
    }
}

// User Actions End

// Auction Actions Start
const getLiveLotsListAction = (customerId) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_LIVE_LOTS_LIST_REQUEST, })
        Services.getByIdService('auction', '?requestActionType=current&customerId=' + customerId).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                } else if (response.sucess) { return Dispatch({ type: Constants.GET_LIVE_LOTS_LIST_SUCESS, data: response }) }
                else { return Dispatch({ type: Constants.GET_LIVE_LOTS_LIST_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_LIVE_LOTS_LIST_FAILED, data: error }) }
        )
    }
}

const getUpCommingLotsListAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_UPCOMMING_LOTS_LIST_REQUEST, })
        Services.getService('requestAction?requestActionType=upcoming').then(
            (response) => {
                if (response.sucess) {
                    return Dispatch({ type: Constants.GET_UPCOMMING_LOTS_LIST_SUCESS, data: response })
                }
                else if (response.status == 401) {
                    logOutAction();
                }
                else { return Dispatch({ type: Constants.GET_UPCOMMING_LOTS_LIST_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_UPCOMMING_LOTS_LIST_FAILED, data: error }) }
        )
    }
}

const getSoldLotsListAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_SOLD_LOTS_LIST_REQUEST, })
        Services.getService('getsoledlots').then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                } else if (response.sucess) {
                    return Dispatch({ type: Constants.GET_SOLD_LOTS_LIST_SUCESS, data: response })
                }
                else {
                    return Dispatch({ type: Constants.GET_SOLD_LOTS_LIST_FAILED, data: response })
                }
            },
            (error) => { return Dispatch({ type: Constants.GET_SOLD_LOTS_LIST_FAILED, data: error }) }
        )
    }
}

const getExpiredLotsListAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_EXPIRED_LOTS_LIST_REQUEST, })
        Services.getService('getexpiredlots').then(
            (response) => {
                if (response.status == 401) { logOutAction(); }
                else if (response.sucess) { return Dispatch({ type: Constants.GET_EXPIRED_LOTS_LIST_SUCESS, data: response }) }
                else { return Dispatch({ type: Constants.GET_EXPIRED_LOTS_LIST_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_EXPIRED_LOTS_LIST_FAILED, data: error }) }
        )
    }
}

const getLotsAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_LOTS_LIST_REQUEST, })
        Services.getService('lots').then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response) {
                    return Dispatch({ type: Constants.GET_LOTS_LIST_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.GET_LOTS_LIST_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_LOTS_LIST_FAILED, data: error }) }
        )
    }
}

const getLotsDetailsAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_LOTS_LIST_REQUEST, })
        Services.getByIdService('lotdetails', details).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response) {
                    return Dispatch({ type: Constants.GET_LOTS_DETAILS_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.GET_LOTS_DETAILS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_LOTS_DETAILS_FAILED, data: error }) }
        )
    }
}

const newBidOnLotAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.NEW_BID_ON_LOT_REQUEST, })
        Services.postService('addnewbidtolot', details).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response) {
                    return Dispatch({ type: Constants.NEW_BID_ON_LOT_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.NEW_BID_ON_LOT_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.NEW_BID_ON_LOT_FAILED, data: error }) }
        )
    }
}

const getWinLotsListAction = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_CUSTOMER_WIN_LOTS_REQUEST, })
        Services.getByIdService('getcustomerwinlots', id).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response.success) {
                    return Dispatch({ type: Constants.GET_CUSTOMER_WIN_LOTS_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.GET_CUSTOMER_WIN_LOTS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_CUSTOMER_WIN_LOTS_FAILED, data: error }) }
        )
    }
}

const getParticipatelotsAction = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_CUSTOMER_PARTICIPATED_LOTS_REQUEST, })
        Services.getByIdService('getcustimerparticipatelots', id).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response.sucess) {
                    return Dispatch({ type: Constants.GET_CUSTOMER_PARTICIPATED_LOTS_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.GET_CUSTOMER_PARTICIPATED_LOTS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_CUSTOMER_PARTICIPATED_LOTS_FAILED, data: error }) }
        )
    }
}

const getPaymentIdAction = (details) => {
    Services.postService('getlotpaymentid', details).then(
        (response) => {
            if (response.status == 401) {
                logOutAction();
            }
            else if (response.sucess) {
                return response.data
            }
            else { return response.data }
        },
        (error) => { return error })
}

const completePaymentAction = (details) => {
    Services.postService('completelotpayment', details).then(
        (response) => {
            if (response.status == 401) {
                logOutAction();
            }
            else if (response.sucess) {
                return response.data
            }
            else { return response.data }
        },
        (error) => { return error })
}

const getCustomerBalanceAction = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_CUSTOMER_BALANCE_REQUEST, })
        Services.getByIdService('getcustomerbalance', id).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response.sucess) {
                    return Dispatch({ type: Constants.GET_CUSTOMER_BALANCE_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.GET_CUSTOMER_BALANCE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_CUSTOMER_BALANCE_FAILED, data: error }) }
        )
    }
}

const participateInLotAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.PARTICIPATE_IN_LOT_REQUEST, })
        Services.postService('participateonlot', details).then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response?.data?.sucess) {
                    return Dispatch({ type: Constants.PARTICIPATE_IN_LOT_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.PARTICIPATE_IN_LOT_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.PARTICIPATE_IN_LOT_FAILED, data: error }) }
        )
    }
}

const clearParticipateInLotStatusCleanAction = () => {
    return (Dispatch) => {
        return Dispatch({ type: Constants.CLEAR_PARTICIPATE_IN_LOT_STATE, data: null })
    }
}

const clearParticipateInExpireLotLotStatusCleanAction = () => {
    return (Dispatch) => {
        return Dispatch({ type: Constants.CLEAR_PARTICIPATE_IN_EXPIRE_LOT_STATE, data: null })
    }
}

const participoteOnExpireLotAction = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.PARTICIPATE_IN_EXPIRE_LOT_REQUEST, })
        Services.postService('participeteonexpirelot', details).then(
            (response) => {
                if (response.status == 401) { logOutAction(); }
                else if (response?.data?.sucess) { return Dispatch({ type: Constants.PARTICIPATE_IN_EXPIRE_LOT_SUCESS, data: response }) }
                else { return Dispatch({ type: Constants.PARTICIPATE_IN_EXPIRE_LOT_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.PARTICIPATE_IN_EXPIRE_LOT_REQUEST, data: error }) }
        )
    }
}

const getCategoriesAction = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_LOTS_CATEGORIES_REQUEST, })
        Services.getService('getcategorys').then(
            (response) => {
                if (response.status == 401) {
                    logOutAction();
                }
                else if (response) {
                    return Dispatch({ type: Constants.GET_LOTS_CATEGORIES_SUCESS, data: response })
                }
                else { return Dispatch({ type: Constants.GET_LOTS_CATEGORIES_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_LOTS_CATEGORIES_FAILED, data: error }) }
        )
    }
}


export {
    getLiveLotsListAction,
    getSoldLotsListAction,
    getExpiredLotsListAction,
    getLotsAction,
    getUpCommingLotsListAction,
    getLotsDetailsAction,
    signUpAction,
    loginAction,
    userDetailsUpdateAction,
    logOutAction,
    getUserDetailsAction,
    isAllradyLoginAction,
    newBidOnLotAction,
    getWinLotsListAction,
    getParticipatelotsAction,
    getPaymentIdAction,
    completePaymentAction,
    getCustomerBalanceAction,
    participateInLotAction,
    clearParticipateInLotStatusCleanAction,
    clearParticipateInExpireLotLotStatusCleanAction,
    participoteOnExpireLotAction,
    getCategoriesAction,
    requestAtivateAccount,
    loginWithGoogleAction
}