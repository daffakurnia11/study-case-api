import axios from "axios";
import * as url from "./url";

axios.defaults.baseURL = url.baseURL();

export async function LoginApi(data) {
  return await axios
    .post(url.LoginUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export async function setAuthToken(accessToken) {
  return (axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`);
}

export async function LogoutApi(data) {
  return await axios
    .post(url.LogoutUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export async function ProductListApi() {
  return await axios
    .get(url.ProductUrl())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
