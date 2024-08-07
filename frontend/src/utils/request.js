import axios from "axios";
import { RequestMethods } from "./request_methods.js";

axios.defaults.baseURL = "http://localhost:8080/api";

export const requestApi = async ({
  includeToken = true,
  route,
  requestMethod = RequestMethods.GET,
  body,
  navigationFunction,
}) => {
  try {
    const headers = includeToken
      ? {
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        }
      : {};

    const { data } = await axios.request({
      url: route,
      method: requestMethod,
      data: body,
      headers: headers,
    });

    return data;
  } catch (error) {
    if (error.response.status === 403) {
      localStorage.clear();
      navigationFunction("/login");
    }
  }
};
