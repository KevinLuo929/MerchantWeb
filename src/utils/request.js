import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import qs from "qs";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if (res.code !== 200) {
    if (response.status !== 200) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
const http = {
  post(url, params) {
    return service.post(url, params, {
      transformRequest: [
        (params) => {
          return JSON.stringify(params);
        },
      ],
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  put(url, params) {
    return service.put(url, params, {
      transformRequest: [
        (params) => {
          return JSON.stringify(params);
        },
      ],
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  get(url, params) {
    return service.get(url, {
      params: params,
      paramsSerializer: (params) => {
        return QueryString.stringify(params);
      },
    });
  },
  getRestApi(url, params) {
    return service.get(`${url}/${params}`);
  },
  delete(url, params) {
    return service.delete(`${url}/${params}`).catch((err) => {
      message.error(err.msg);
      return Promise.reject(err);
    });
  },
  login(url, params) {
    debugger;
    return service.post(url, params, {
      transformRequest: [
        (params) => {
          // return  params.username;
          return '"' + params.username + '"';
        },
      ],
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default http;
