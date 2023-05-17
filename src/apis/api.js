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
