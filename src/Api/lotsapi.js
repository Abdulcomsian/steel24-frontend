import axios from "axios";
import Constants from "../Redux/Constants";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getActiveLots = (customerId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}activeLots`,
    data: { customer_id: parseInt(customerId) },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getUpcomingLots = (customerId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}upcomingLots`,
    data: {
      customer_id: customerId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getExpiredLots = (customerId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}expiredLots`,
    data: { customer_id: parseInt(customerId) },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const getSoldLots = (customerId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}soldLots`,
    data: { customer_id: parseInt(customerId) },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getLotDetails = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}lotdetails/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const addFavourite = (customer_id, lotId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}addFavorites`,
    data: {
      customer_id: customer_id,
      lot_id: lotId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteFavourite = (customer_id, lotId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}deleteFavorite`,
    data: {
      customer_id: customer_id,
      lot_id: lotId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const participateInLot = (customer_id, lotId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}participateonlot`,
    data: {
      customerId: customer_id,
      lotid: lotId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const addnewbidtolot = (values) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}customer-bid`,
    data: values,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createautobid = (lotId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}set-customer-autobid`,
    data: {
      lotId: lotId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const checkAutoBid = (lotId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}check-customer-autobid`,
    data: {
      lotId: lotId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export const cancelAutoBid = (lotId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}stop-customer-autobid`,
    data: {
      lotId: lotId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getFavorites = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}showFavorites/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getactiveupcominglots = (customerId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}getactiveupcominglots`,
    data: {
      customer_id: customerId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getCategory = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}showcategories`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getFilterlots = (customerId, categoryId, status) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}showcategorieswithlot`,
    data: {
      customerId: customerId,
      categoryId: categoryId,
      status: status,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getProductPictures = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}showProductImages`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const downloadExcelFile = (status) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}exportLotsToExcel`,
    data: {
      status: status,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const LiveLotsFavorites = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}showLiveLotsFavorites/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const SoldLotsFavorites = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}showSoldLotsFavorites/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const ExpiredLotsFavorites = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}showExpiredLotsFavorites/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const UpcomingLotsFavorites = (id) => {
  return axios({
    method: "get",
    url: `${Constants.BASEURL}showUpcomingLotsFavorites/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getWinLotsByDate = (startDate, endDate, id) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}winLotsShow`,
    data: {
      start_date: startDate,
      end_date: endDate,
      customer_id: id,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const downloadExcelFileWinLot = (id) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}winLotsExcelExport`,
    data: {
      customer_id: id,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getBalanceByDate = (startDate, endDate, id) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}showcustomerbalnace`,
    data: {
      start_date: startDate,
      end_date: endDate,
      customer_id: id,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const winSpecificDateExcel = (customerId, startDate, endDate) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}winspecificdateExcel`,
    data: {
      customer_id: customerId,
      start_date: startDate,
      end_date: endDate,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const downloadExcelFileWitCatagroy = (
  customerId,
  categroy_id,
  lot_status
) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}excelcategoryoflots`,
    data: {
      customerId: customerId,
      categoryId: categroy_id,
      status: lot_status,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getSTALots = (customerId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}stalots`,
    data: {
      customer_id: customerId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getSTAFavLots = (customerId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}stafavlots`,
    data: {
      customer_id: customerId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const downloadFavExcelFile = (customerId, status) => {
  let data = new FormData();
  data.append("customer_id", customerId);
  data.append("status", status);
  return axios({
    method: "post",
    url: `${Constants.BASEURL}favlotsexcelexport`,
    data: data,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const downloadBalanceExcel = (data) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}paymentexcelexport`,
    data: {
      data:data
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const requestToRestart = (customerId,LotId) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}resetLotRequest`,
    data: {
      customerId:customerId,
      lotId:LotId,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};


export const contactUsMail = (data) => {
  return axios({
    method: "post",
    url: `${Constants.BASEURL}contactUs`,
    data: data,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};