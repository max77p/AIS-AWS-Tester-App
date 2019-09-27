const axios = require("axios");

export function getLogin(params) {
  return axios({
    method: "POST",
    url: params.Url,
    withCredentials: true,
    data: {
      username: params.User.username,
      password: params.User.password,
      deviceName: params.deviceName
    }
  });
}
export function getQuery(params,data) {
  return axios({
    method: "POST",
    url: params.Url,
    withCredentials: true,
    data: data
  });
}