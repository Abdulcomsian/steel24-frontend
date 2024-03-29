import moment from "moment";

const Constants = {
  // Server
  // BASEURL: 'http://127.0.0.1:8000/api/',
  BASEURL: "https://admin.steel24.in/api/",

  // SERVERURL: 'http://127.0.0.1:8000/',
  SERVERURL: "https://admin.steel24.in/",

  firebaseConfig: {
    apiKey: "AIzaSyCTMa2MX27L40POGDkoA-J_rOFL2bT7jz4",
    authDomain: "steel24-a898f.firebaseapp.com",
    databaseURL: "https://steel24-a898f-default-rtdb.firebaseio.com",
    projectId: "steel24-a898f",
    storageBucket: "steel24-a898f.appspot.com",
    messagingSenderId: "924896686955",
    appId: "1:924896686955:web:e7b4c62ab4e416a61f522e",
    measurementId: "G-ZPC54XMY2V",
  },
  // Lost
  GET_LIVE_LOTS_LIST_REQUEST: "GET_LIVE_LOTS_LIST_REQUEST",
  GET_LIVE_LOTS_LIST_SUCESS: "GET_LIVE_LOTS_LIST_SUCESS",
  GET_LIVE_LOTS_LIST_FAILED: "GET_LIVE_LOTS_LIST_FAILED",

  GET_UPCOMMING_LOTS_LIST_REQUEST: "GET_UPCOMMING_LOTS_LIST_REQUEST",
  GET_UPCOMMING_LOTS_LIST_SUCESS: "GET_UPCOMMING_LOTS_LIST_SUCESS",
  GET_UPCOMMING_LOTS_LIST_FAILED: "GET_UPCOMMING_LOTS_LIST_FAILED",

  GET_SOLD_LOTS_LIST_REQUEST: "GET_SOLD_LOTS_LIST_REQUEST",
  GET_SOLD_LOTS_LIST_SUCESS: "GET_SOLD_LOTS_LIST_SUCESS",
  GET_SOLD_LOTS_LIST_FAILED: "GET_SOLD_LOTS_LIST_FAILED",

  GET_EXPIRED_LOTS_LIST_REQUEST: "GET_EXPIRED_LOTS_LIST_REQUEST",
  GET_EXPIRED_LOTS_LIST_SUCESS: "GET_EXPIRED_LOTS_LIST_SUCESS",
  GET_EXPIRED_LOTS_LIST_FAILED: "GET_EXPIRED_LOTS_LIST_FAILED",

  GET_LOTS_LIST_REQUEST: "GET_LOTS_LIST_REQUEST",
  GET_LOTS_LIST_SUCESS: "GET_LOTS_LIST_SUCESS",
  GET_LOTS_LIST_FAILED: "GET_LOTS_LIST_FAILED",

  GET_LOTS_DETAILS_REQUEST: "GET_LOTS_DETAILS_REQUEST",
  GET_LOTS_DETAILS_SUCESS: "GET_LOTS_DETAILS_SUCESS",
  GET_LOTS_DETAILS_FAILED: "GET_LOTS_DETAILS_FAILED",

  USER_SIGNUP_REQUEST: "USER_SIGNUP_REQUEST",
  USER_SIGNUP_SUCESS: "USER_SIGNUP_SUCESS",
  USER_SIGNUP_FAILED: "USER_SIGNUP_FAILED",

  USER_LOGIN_WITH_GOOGLE_REQUEST: "USER_LOGIN_WITH_GOOGLE_REQUEST",
  USER_LOGIN_WITH_GOOGLE_SUCESS: "USER_LOGIN_WITH_GOOGLE_SUCESS",
  USER_LOGIN_WITH_GOOGLE_FAILED: "USER_LOGIN_WITH_GOOGLE_FAILED",

  USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST",
  USER_LOGIN_SUCESS: "USER_LOGIN_SUCESS",
  USER_LOGIN_FAILED: "USER_LOGIN_FAILED",

  GET_USER_DETAILS_REQUEST: "GET_USER_DETAILS_REQUEST",
  GET_USER_DETAILS_SUCESS: "GET_USER_DETAILS_SUCESS",
  GET_USER_DETAILS_FAILED: "GET_USER_DETAILS_FAILED",

  ACTIVATE_ACCOUNT_REQUEST: "ACTIVATE_ACCOUNT_REQUEST",
  ACTIVATE_ACCOUNT_SUCESS: "ACTIVATE_ACCOUNT_SUCESS",
  ACTIVATE_ACCOUNT_FAILED: "ACTIVATE_ACCOUNT_FAILED",

  USER_ALLRADY_LOGIN: "USER_ALLRADY_LOGIN",

  USER_DETAILS_UPDATE_REQUEST: "USER_DETAILS_UPDATE_REQUEST",
  USER_DETAILS_UPDATE_SUCESS: "USER_DETAILS_UPDATE_SUCESS",
  USER_DETAILS_UPDATE_FAILED: "USER_DETAILS_UPDATE_FAILED",

  USER_LOG_OUT: "USER_LOG_OUT",

  NEW_BID_ON_LOT_REQUEST: "NEW_BID_ON_LOT_REQUEST",
  NEW_BID_ON_LOT_SUCESS: "NEW_BID_ON_LOT_SUCESS",
  NEW_BID_ON_LOT_FAILED: "NEW_BID_ON_LOT_FAILED",

  GET_CUSTOMER_WIN_LOTS_REQUEST: "GET_CUSTOMER_WIN_LOTS_REQUEST",
  GET_CUSTOMER_WIN_LOTS_SUCESS: "GET_CUSTOMER_WIN_LOTS_SUCESS",
  GET_CUSTOMER_WIN_LOTS_FAILED: "GET_CUSTOMER_WIN_LOTS_FAILED",

  GET_CUSTOMER_PARTICIPATED_LOTS_REQUEST:
    "GET_CUSTOMER_PARTICIPATED_LOTS_REQUEST",
  GET_CUSTOMER_PARTICIPATED_LOTS_SUCESS:
    "GET_CUSTOMER_PARTICIPATED_LOTS_SUCESS",
  GET_CUSTOMER_PARTICIPATED_LOTS_FAILED:
    "GET_CUSTOMER_PARTICIPATED_LOTS_FAILED",

  GET_CUSTOMER_BALANCE_REQUEST: "GET_CUSTOMER_BALANCE_REQUEST",
  GET_CUSTOMER_BALANCE_SUCESS: "GET_CUSTOMER_BALANCE_SUCESS",
  GET_CUSTOMER_BALANCE_FAILED: "GET_CUSTOMER_BALANCE_FAILED",

  // participateInLotAction

  PARTICIPATE_IN_LOT_REQUEST: "PARTICIPATE_IN_LOT_REQUEST",
  PARTICIPATE_IN_LOT_SUCESS: "PARTICIPATE_IN_LOT_SUCESS",
  PARTICIPATE_IN_LOT_FAILED: "PARTICIPATE_IN_LOT_FAILED",

  CLEAR_PARTICIPATE_IN_LOT_STATE: "CLEAR_PARTICIPATE_IN_LOT_STATE",

  PARTICIPATE_IN_EXPIRE_LOT_REQUEST: "PARTICIPATE_IN_EXPIRE_LOT_REQUEST",
  PARTICIPATE_IN_EXPIRE_LOT_SUCESS: "PARTICIPATE_IN_EXPIRE_LOT_SUCESS",
  PARTICIPATE_IN_EXPIRE_LOT_FAILED: "PARTICIPATE_IN_EXPIRE_LOT_FAILED",

  CLEAR_PARTICIPATE_IN_EXPIRE_LOT_STATE:
    "CLEAR_PARTICIPATE_IN_EXPIRE_LOT_STATE",

  GET_LOTS_CATEGORIES_REQUEST: "GET_LOTS_CATEGORIES_REQUEST",
  GET_LOTS_CATEGORIES_SUCESS: "GET_LOTS_CATEGORIES_SUCESS",
  GET_LOTS_CATEGORIES_FAILED: "GET_LOTS_CATEGORIES_FAILED",
};

export function getTodayDate() {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return formattedDate;
}

export function getFormattedDate(date1) {
  const date = new Date(date1);
  const formattedDate = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}

export function getDate(dateTime) {
  const dateObj = new Date(dateTime);
  const countdownDate = new Date(dateObj.getTime());
  return countdownDate;
}

export function getDateTime(dateTime) {
  return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
}

export const handleDownload = (filepath) => {
  const link = document.createElement("a");
  link.href = filepath;
  // link.target = '_blank'; // Open in a new tab/window
  link.download = "your-filename.xlsx"; // Specify the desired download filename
  link.click();
};

export function dateTimeformated(givenDate) {
  const date = new Date(givenDate);
  const formattedDate= moment(date).format("DD-MMM-YY h:mma");
  return formattedDate;
}
export default Constants;
