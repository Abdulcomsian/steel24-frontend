import axios from "axios";
import Constants from "../Constants";

const getToken = () => {
  return localStorage.getItem("token");
};

const getService = (endPoint, data) => {
  return axios
    .get(Constants.BASEURL + endPoint, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getToken()}`,
        data,
      },
      params: data,
    })
    .then((Response) => Response.data)
    .catch((error) => {
      return error.response;
    });
};

const getByIdService = (endPoint, para) => {
  return axios
    .get(Constants.BASEURL + endPoint + "/" + para, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => Response.data)
    .catch((error) => {
      return error.response;
    });
};

const postService = (endPoint, para) => {
  return axios
    .post(Constants.BASEURL + endPoint, para, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => Response)
    .catch((error) => {
      return error.response;
    });
};

const patchService = (endPoint, id, para) => {
  return axios
    .patch(Constants.BASEURL + endPoint + "/" + id, para, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => Response.data)
    .catch((error) => {
      return error.response;
    });
};

const deleteService = (endPoint, para) => {
  return axios
    .delete(Constants.BASEURL + endPoint + "/" + para, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => Response.data)
    .catch((error) => {
      return error.response;
    });
};

const customePostService = (url, para) => {
  return axios
    .post(url, para, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((Response) => Response.data)
    .catch((error) => {
      return error.response;
    });
};

export const Services = {
  getService,
  getByIdService,
  postService,
  patchService,
  deleteService,
  customePostService,
};
